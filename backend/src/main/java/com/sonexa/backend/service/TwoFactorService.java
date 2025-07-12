package com.sonexa.backend.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TwoFactorService {

    private static final String ISSUER = "Sonexa AI";
    private static final SecureRandom random = new SecureRandom();

    public String generateSecret() {
        byte[] buffer = new byte[20];
        random.nextBytes(buffer);
        return base32Encode(buffer);
    }

    public String generateQRCodeUrl(String email, String secret) {
        try {
            String encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8);
            String encodedIssuer = URLEncoder.encode(ISSUER, StandardCharsets.UTF_8);

            String otpAuthUrl = String.format(
                    "otpauth://totp/%s:%s?secret=%s&issuer=%s",
                    encodedIssuer, encodedEmail, secret, encodedIssuer
            );

            return String.format(
                    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=%s",
                    URLEncoder.encode(otpAuthUrl, StandardCharsets.UTF_8)
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR code URL", e);
        }
    }

    public boolean verifyCode(String secret, String code) {
        try {
            long timeWindow = System.currentTimeMillis() / 30000;

            // Check current time window and adjacent ones for clock skew
            for (int i = -1; i <= 1; i++) {
                if (generateTOTP(secret, timeWindow + i).equals(code)) {
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    private String generateTOTP(String secret, long timeWindow) {
        try {
            byte[] secretBytes = base32Decode(secret);
            byte[] timeBytes = longToByteArray(timeWindow);

            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA1");
            javax.crypto.spec.SecretKeySpec secretKeySpec = new javax.crypto.spec.SecretKeySpec(secretBytes, "HmacSHA1");
            mac.init(secretKeySpec);

            byte[] hash = mac.doFinal(timeBytes);
            int offset = hash[hash.length - 1] & 0x0F;
            int binary = ((hash[offset] & 0x7F) << 24)
                    | ((hash[offset + 1] & 0xFF) << 16)
                    | ((hash[offset + 2] & 0xFF) << 8)
                    | (hash[offset + 3] & 0xFF);

            int otp = binary % 1000000;
            return String.format("%06d", otp);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate TOTP", e);
        }
    }

    private byte[] longToByteArray(long value) {
        byte[] result = new byte[8];
        for (int i = 7; i >= 0; i--) {
            result[i] = (byte) (value & 0xFF);
            value >>= 8;
        }
        return result;
    }

    private String base32Encode(byte[] bytes) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        StringBuilder result = new StringBuilder();

        int buffer = 0;
        int bitsLeft = 0;

        for (byte b : bytes) {
            buffer = (buffer << 8) | (b & 0xFF);
            bitsLeft += 8;

            while (bitsLeft >= 5) {
                result.append(alphabet.charAt((buffer >> (bitsLeft - 5)) & 0x1F));
                bitsLeft -= 5;
            }
        }

        if (bitsLeft > 0) {
            result.append(alphabet.charAt((buffer << (5 - bitsLeft)) & 0x1F));
        }

        return result.toString();
    }

    private byte[] base32Decode(String encoded) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        encoded = encoded.toUpperCase().replaceAll("[^A-Z2-7]", "");

        if (encoded.length() == 0) {
            return new byte[0];
        }

        int encodedLength = encoded.length();
        int outputLength = encodedLength * 5 / 8;
        byte[] result = new byte[outputLength];

        int buffer = 0;
        int bitsLeft = 0;
        int count = 0;

        for (char c : encoded.toCharArray()) {
            int val = alphabet.indexOf(c);
            if (val < 0) {
                continue;
            }

            buffer = (buffer << 5) | val;
            bitsLeft += 5;

            if (bitsLeft >= 8) {
                result[count++] = (byte) ((buffer >> (bitsLeft - 8)) & 0xFF);
                bitsLeft -= 8;
            }
        }

        return result;
    }
}
