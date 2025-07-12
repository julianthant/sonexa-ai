"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import {
  CompanyEmailConfig,
  EmailVerification,
  generateCompanyEmail,
  sendVerificationEmail,
  verifySecurityCode,
  getEmailVerifications,
  regenerateCompanyIdentifier,
} from "@/data/settings";

interface EmailVerificationProps {
  companyIdentifier: string;
  teamCode: string;
  onVerificationComplete: (verified: boolean) => void;
  onCompanyIdentifierChange: (newIdentifier: string) => void;
}

export function EmailVerificationSection({
  companyIdentifier,
  teamCode,
  onVerificationComplete,
  onCompanyIdentifierChange,
}: EmailVerificationProps) {
  const [emailConfig, setEmailConfig] = useState<CompanyEmailConfig | null>(
    null
  );
  const [verifications, setVerifications] = useState<EmailVerification[]>([]);
  const [currentVerification, setCurrentVerification] =
    useState<EmailVerification | null>(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTeamCode, setShowTeamCode] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadEmailConfig();
    loadVerifications();
  }, [companyIdentifier]);

  const loadEmailConfig = async () => {
    try {
      const config = await generateCompanyEmail(companyIdentifier);
      setEmailConfig(config);
    } catch (error) {
      console.error("Error loading email config:", error);
    }
  };

  const loadVerifications = async () => {
    try {
      const verifs = await getEmailVerifications(companyIdentifier);
      setVerifications(verifs);

      // Find the latest pending or verified verification
      const latest = verifs
        .filter((v) => v.status === "pending" || v.status === "verified")
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

      if (latest) {
        setCurrentVerification(latest);
        if (latest.status === "verified") {
          onVerificationComplete(true);
        }
      }
    } catch (error) {
      console.error("Error loading verifications:", error);
    }
  };

  const handleSendVerification = async () => {
    if (!emailConfig) return;

    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    try {
      const verification = await sendVerificationEmail(
        companyIdentifier,
        teamCode
      );
      setCurrentVerification(verification);
      setVerifications((prev) => [verification, ...prev]);
      setProgress(100);
      setMessage({
        type: "info",
        text: `Verification email sent! Security code: ${verification.securityCode}`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send verification email. Please try again.",
      });
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleVerifyCode = async () => {
    if (!currentVerification || !enteredCode.trim()) return;

    setIsLoading(true);

    try {
      const result = await verifySecurityCode(
        currentVerification.id,
        enteredCode.trim(),
        teamCode
      );

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        onVerificationComplete(true);
        if (result.verification) {
          setCurrentVerification(result.verification);
        }
        setEnteredCode("");
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Verification failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateIdentifier = async () => {
    setIsLoading(true);

    try {
      const newIdentifier = await regenerateCompanyIdentifier();
      onCompanyIdentifierChange(newIdentifier);
      setMessage({
        type: "info",
        text: "New company identifier generated. Please send a new verification email.",
      });
      setCurrentVerification(null);
      setEnteredCode("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to generate new identifier. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage({ type: "success", text: "Copied to clipboard!" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "expired":
        return <AlertCircle className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Company Email Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure your company-specific email address for voice message
            processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Company Identifier</Label>
            <div className="flex space-x-2 mt-1">
              <Input value={companyIdentifier} readOnly className="font-mono" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(companyIdentifier)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateIdentifier}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
            <p className="mt-1 text-gray-500 text-xs">
              This unique identifier is used to filter emails for your company
            </p>
          </div>

          {emailConfig && (
            <div>
              <Label>Generated Company Email</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  value={emailConfig.generatedEmail}
                  readOnly
                  className="bg-blue-50 font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(emailConfig.generatedEmail)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="mt-1 text-gray-500 text-xs">
                Send voice messages to this email address. They will be
                automatically filtered for your company.
              </p>
            </div>
          )}

          <div>
            <Label>Team Code (for verification)</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                type={showTeamCode ? "text" : "password"}
                value={teamCode}
                readOnly
                className="font-mono"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTeamCode(!showTeamCode)}
              >
                {showTeamCode ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(teamCode)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="mt-1 text-gray-500 text-xs">
              This code must match the security code sent via email for
              verification
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Verification Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Email Verification</span>
          </CardTitle>
          <CardDescription>
            Verify your company email by matching the security code with your
            team code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!currentVerification || currentVerification.status !== "verified" ? (
            <>
              <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                <h4 className="mb-2 font-medium text-blue-900">
                  Verification Process:
                </h4>
                <ol className="space-y-1 text-blue-800 text-sm">
                  <li>1. Click "Send Verification Email" below</li>
                  <li>2. A security code will be sent to your company inbox</li>
                  <li>3. Enter the security code in the field below</li>
                  <li>
                    4. The code must match your team code for verification
                  </li>
                </ol>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSendVerification}
                  disabled={isLoading || !emailConfig}
                  className="flex-1"
                >
                  <Send className="mr-2 w-4 h-4" />
                  {isLoading ? "Sending..." : "Send Verification Email"}
                </Button>
              </div>

              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sending verification email...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {currentVerification &&
                currentVerification.status === "pending" && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="securityCode">Enter Security Code</Label>
                      <Input
                        id="securityCode"
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                        placeholder="Enter the security code from email..."
                        className="mt-1 font-mono"
                      />
                      <p className="mt-1 text-gray-500 text-xs">
                        Code expires:{" "}
                        {currentVerification.expiresAt.toLocaleString()}
                      </p>
                    </div>

                    <Button
                      onClick={handleVerifyCode}
                      disabled={isLoading || !enteredCode.trim()}
                      className="w-full"
                    >
                      <Shield className="mr-2 w-4 h-4" />
                      {isLoading ? "Verifying..." : "Verify Security Code"}
                    </Button>

                    <div className="text-gray-600 text-sm text-center">
                      Attempts: {currentVerification.attempts} /{" "}
                      {currentVerification.maxAttempts}
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Email Verified Successfully!
                </span>
              </div>
              <p className="mt-1 text-green-700 text-sm">
                Your company email is now verified and ready to receive voice
                messages.
              </p>
              <p className="mt-2 text-green-600 text-xs">
                Verified: {currentVerification.verifiedAt?.toLocaleString()}
              </p>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-lg p-3 ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Verification History */}
      {verifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>
              Previous verification attempts for this company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verifications.map((verification) => (
                <div
                  key={verification.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(verification.status)}
                    <div>
                      <p className="font-medium text-sm">
                        {verification.companyEmail}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {verification.createdAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(verification.status)}>
                      {verification.status}
                    </Badge>
                    <span className="text-gray-500 text-xs">
                      {verification.attempts}/{verification.maxAttempts}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
