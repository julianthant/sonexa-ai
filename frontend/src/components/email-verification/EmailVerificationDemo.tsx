"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailVerificationSection } from "@/components/settings/EmailVerificationSection";
import { ArrowLeft, Mail, Shield, Info } from "lucide-react";

export function EmailVerificationDemo() {
  const router = useRouter();
  const [companyIdentifier, setCompanyIdentifier] =
    useState("demo-company-123");
  const [teamCode, setTeamCode] = useState("DEMO-2024-VRF");
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="font-bold text-gray-900 text-3xl">
                Email Verification Demo
              </h1>
              <p className="mt-1 text-gray-600">
                Test the company email verification system
              </p>
            </div>
          </div>
          <Badge variant={isVerified ? "default" : "secondary"}>
            {isVerified ? "Verified" : "Not Verified"}
          </Badge>
        </div>

        {/* Demo Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>How the Email Verification System Works</span>
            </CardTitle>
            <CardDescription>
              This demo shows how companies can verify their email addresses for
              voice message processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              <div className="space-y-2 text-center">
                <div className="flex justify-center items-center bg-blue-100 mx-auto rounded-full w-12 h-12">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">
                  1. Generate Company Email
                </h3>
                <p className="text-gray-600 text-sm">
                  Each company gets a unique email address using the + filter
                  format
                </p>
              </div>

              <div className="space-y-2 text-center">
                <div className="flex justify-center items-center bg-green-100 mx-auto rounded-full w-12 h-12">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">
                  2. Send Security Code
                </h3>
                <p className="text-gray-600 text-sm">
                  When an email is sent, a security code is returned for
                  verification
                </p>
              </div>

              <div className="space-y-2 text-center">
                <div className="flex justify-center items-center bg-purple-100 mx-auto rounded-full w-12 h-12">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900">
                  3. Verify Codes Match
                </h3>
                <p className="text-gray-600 text-sm">
                  The security code must match the team code for verification
                </p>
              </div>
            </div>

            <div className="bg-blue-50 mt-6 p-4 border border-blue-200 rounded-lg">
              <h4 className="mb-2 font-medium text-blue-900">Demo Scenario:</h4>
              <ul className="space-y-1 text-blue-800 text-sm">
                <li>• Company: "Demo Company"</li>
                <li>
                  • Company Identifier:{" "}
                  <code className="bg-white px-1 rounded">
                    {companyIdentifier}
                  </code>
                </li>
                <li>
                  • Team Code:{" "}
                  <code className="bg-white px-1 rounded">{teamCode}</code>
                </li>
                <li>
                  • Generated Email:{" "}
                  <code className="bg-white px-1 rounded">
                    voice+{companyIdentifier}@sonexa.ai
                  </code>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Email Verification Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EmailVerificationSection
            companyIdentifier={companyIdentifier}
            teamCode={teamCode}
            onVerificationComplete={(verified) => {
              setIsVerified(verified);
            }}
            onCompanyIdentifierChange={(newIdentifier) => {
              setCompanyIdentifier(newIdentifier);
              setIsVerified(false);
            }}
          />
        </motion.div>

        {/* Demo Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Instructions</CardTitle>
            <CardDescription>
              Follow these steps to test the verification process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                <h4 className="mb-2 font-medium text-yellow-900">
                  Step-by-Step Demo:
                </h4>
                <ol className="space-y-2 text-yellow-800 text-sm">
                  <li>
                    1. <strong>Click "Send Verification Email"</strong> - This
                    simulates sending an email to the company inbox
                  </li>
                  <li>
                    2. <strong>Note the Security Code</strong> - In a real
                    scenario, this would be sent via email
                  </li>
                  <li>
                    3. <strong>Enter the Security Code</strong> - Copy the
                    displayed security code into the verification field
                  </li>
                  <li>
                    4. <strong>Click "Verify Security Code"</strong> - The
                    system will check if it matches the team code
                  </li>
                  <li>
                    5. <strong>Success!</strong> - If codes match, the email is
                    verified for the company
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                <h4 className="mb-2 font-medium text-green-900">
                  What happens in production:
                </h4>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>
                    • Company sends email to:{" "}
                    <code className="bg-white px-1 rounded">
                      voice+{companyIdentifier}@sonexa.ai
                    </code>
                  </li>
                  <li>
                    • System receives email and extracts company identifier from
                    the + filter
                  </li>
                  <li>
                    • Automatic security code is generated and sent back to
                    company inbox
                  </li>
                  <li>
                    • Company enters security code in their settings panel
                  </li>
                  <li>
                    • If security code matches team code, email is verified
                  </li>
                  <li>
                    • Verified companies can now send voice messages to the
                    system
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                <h4 className="mb-2 font-medium text-blue-900">
                  Security Features:
                </h4>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>
                    • Each company has a unique identifier for email filtering
                  </li>
                  <li>• Security codes expire after 24 hours</li>
                  <li>• Maximum 3 verification attempts per security code</li>
                  <li>• Team codes can be regenerated if compromised</li>
                  <li>• Verification history is tracked for audit purposes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
