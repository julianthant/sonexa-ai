package com.sonexa.backend.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobHttpHeaders;

@Service
public class AzureStorageService {

    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.blob.container-name}")
    private String containerName;

    private BlobServiceClient getBlobServiceClient() {
        String connectionString = String.format(
                "DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;EndpointSuffix=core.windows.net",
                accountName, accountKey
        );
        return new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();
    }

    public String uploadFile(MultipartFile file, String userId) throws IOException {
        String fileName = generateFileName(file.getOriginalFilename(), userId);
        return uploadFile(file.getBytes(), fileName, file.getContentType());
    }

    public String uploadFile(byte[] fileData, String fileName, String contentType) {
        try {
            BlobServiceClient blobServiceClient = getBlobServiceClient();
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

            // Create container if it doesn't exist
            if (!containerClient.exists()) {
                containerClient.create();
            }

            BlobClient blobClient = containerClient.getBlobClient(fileName);

            // Set content type
            BlobHttpHeaders headers = new BlobHttpHeaders()
                    .setContentType(contentType != null ? contentType : "application/octet-stream");

            try (InputStream dataStream = new ByteArrayInputStream(fileData)) {
                blobClient.upload(dataStream, fileData.length, true);
                blobClient.setHttpHeaders(headers);
            }

            return blobClient.getBlobUrl();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to Azure Storage", e);
        }
    }

    public byte[] downloadFile(String fileName) {
        try {
            BlobServiceClient blobServiceClient = getBlobServiceClient();
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(fileName);

            return blobClient.downloadContent().toBytes();
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file from Azure Storage", e);
        }
    }

    public void deleteFile(String fileName) {
        try {
            BlobServiceClient blobServiceClient = getBlobServiceClient();
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(fileName);

            if (blobClient.exists()) {
                blobClient.delete();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file from Azure Storage", e);
        }
    }

    public boolean fileExists(String fileName) {
        try {
            BlobServiceClient blobServiceClient = getBlobServiceClient();
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(fileName);

            return blobClient.exists();
        } catch (Exception e) {
            return false;
        }
    }

    public String getFileUrl(String fileName) {
        BlobServiceClient blobServiceClient = getBlobServiceClient();
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(fileName);

        return blobClient.getBlobUrl();
    }

    private String generateFileName(String originalFileName, String userId) {
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        return String.format("users/%s/%s%s",
                userId,
                UUID.randomUUID().toString(),
                extension
        );
    }

    public long getFileSize(String fileName) {
        try {
            BlobServiceClient blobServiceClient = getBlobServiceClient();
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(fileName);

            return blobClient.getProperties().getBlobSize();
        } catch (Exception e) {
            return 0;
        }
    }
}
