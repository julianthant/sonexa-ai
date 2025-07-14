"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderEmail: string;
  voiceMessageId: string;
  onVerificationComplete: (success: boolean) => void;
}

export function VerificationModal({
  isOpen,
  onClose,
  senderEmail,
  voiceMessageId,
  onVerificationComplete,
}: VerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setIsVerifying(true);

    try {
      // Mock verification - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success/failure based on code
      const isSuccess = verificationCode === "123456"; // Mock success code

      if (isSuccess) {
        toast.success("Email verified successfully!");
        onVerificationComplete(true);
        onClose();
      } else {
        setAttempts((prev) => prev + 1);

        if (attempts + 1 >= maxAttempts) {
          toast.error("Maximum attempts reached. Please request a new code.");
          onVerificationComplete(false);
          onClose();
        } else {
          toast.error(
            `Invalid code. ${maxAttempts - (attempts + 1)} attempts remaining.`
          );
          setVerificationCode("");
        }
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
  };

  const resendCode = async () => {
    try {
      // Mock resend - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("New verification code sent to " + senderEmail);
      setAttempts(0);
      setVerificationCode("");
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white shadow-xl mx-4 p-6 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full w-16 h-16">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6 text-center">
              <h2 className="mb-2 font-semibold text-gray-900 text-xl">
                Email Verification Required
              </h2>
              <p className="text-gray-600">
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium text-gray-900">{senderEmail}</span>
              </p>
            </div>

            <div className="space-y-6">
              {/* Voice Message Info */}
              <div className="bg-blue-50 p-4 border border-blue-100 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900 text-sm">
                    Voice Message ID
                  </span>
                </div>
                <code className="font-mono text-blue-800 text-sm">
                  {voiceMessageId}
                </code>
              </div>

              {/* Verification Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code" className="font-medium text-gray-700">
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={handleCodeChange}
                    placeholder="Enter 6-digit code"
                    className="mt-1 font-mono text-lg text-center tracking-widest"
                    maxLength={6}
                    disabled={isVerifying}
                  />
                  <p className="mt-1 text-gray-500 text-sm text-center">
                    Check your email for the verification code
                  </p>
                </div>

                {/* Attempt Counter */}
                {attempts > 0 && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {maxAttempts - attempts} attempts remaining
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isVerifying || verificationCode.length !== 6}
                    className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 w-4 h-4" />
                        Verify Email
                      </>
                    )}
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resendCode}
                      disabled={isVerifying}
                      className="flex-1"
                    >
                      Resend Code
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      disabled={isVerifying}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>

              {/* Help Text */}
              <div className="bg-gray-50 p-4 border border-gray-100 rounded-lg">
                <p className="text-gray-600 text-sm text-center">
                  <strong>Note:</strong> For testing purposes, use code{" "}
                  <code className="bg-gray-200 px-1 rounded">123456</code> to
                  verify successfully.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
