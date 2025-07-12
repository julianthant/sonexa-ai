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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AppNavbar } from "@/components/layout/AppNavbar";
import {
  Building2,
  Users,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export function OrganizationCreateClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [createdOrganization, setCreatedOrganization] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock organization creation - replace with actual API call
      const mockOrganization = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        inviteCode: `ORG-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}`,
        createdAt: new Date().toISOString(),
        memberCount: 1,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCreatedOrganization(mockOrganization);
      toast.success("Organization created successfully!");
    } catch (error) {
      toast.error("Failed to create organization. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyInviteCode = () => {
    if (createdOrganization?.inviteCode) {
      navigator.clipboard.writeText(createdOrganization.inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      toast.success("Invite code copied to clipboard!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (createdOrganization) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <AppNavbar />

        <div className="mx-auto px-4 py-8 container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-6 text-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-4 rounded-full w-16 h-16">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-2xl">
                  🎉 Organization Created Successfully!
                </CardTitle>
                <CardDescription className="text-lg">
                  Your organization "{createdOrganization.name}" is ready for
                  team collaboration
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Organization Details */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100 rounded-lg">
                  <h3 className="flex items-center mb-4 font-semibold text-blue-900">
                    <Building2 className="mr-2 w-5 h-5" />
                    Organization Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-blue-700 text-sm">Name</Label>
                      <p className="font-medium text-blue-900">
                        {createdOrganization.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-blue-700 text-sm">
                        Description
                      </Label>
                      <p className="text-blue-800">
                        {createdOrganization.description}
                      </p>
                    </div>
                    <div>
                      <Label className="text-blue-700 text-sm">Created</Label>
                      <p className="text-blue-800">
                        {new Date(
                          createdOrganization.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Invite Code */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border border-emerald-100 rounded-lg">
                  <h3 className="flex items-center mb-4 font-semibold text-emerald-900">
                    <Users className="mr-2 w-5 h-5" />
                    Invite Team Members
                  </h3>
                  <p className="mb-4 text-emerald-800">
                    Share this invite code with team members to join your
                    organization:
                  </p>

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white p-3 border border-emerald-200 rounded-md">
                      <code className="font-mono font-bold text-emerald-900 text-lg">
                        {createdOrganization.inviteCode}
                      </code>
                    </div>
                    <Button
                      onClick={copyInviteCode}
                      variant="outline"
                      size="sm"
                      className="hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 border border-purple-100 rounded-lg">
                  <h3 className="mb-4 font-semibold text-purple-900">
                    What's Next?
                  </h3>
                  <ul className="space-y-2 text-purple-800">
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600">1.</span>
                      Share the invite code with your team members
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600">2.</span>
                      Create teams within your organization for different
                      projects
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600">3.</span>
                      Start collaborating on voice messages and documents
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600">4.</span>
                      Manage team permissions and roles as needed
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-row flex-col gap-4 pt-4">
                  <Button
                    onClick={() => router.push("/collaboration")}
                    className="flex-1 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700"
                  >
                    Go to Team Collaboration
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <AppNavbar />

      <div className="mx-auto px-4 py-8 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full w-16 h-16">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-gray-900 text-2xl">
                Create New Organization
              </CardTitle>
              <CardDescription className="text-lg">
                Set up a new organization to manage teams and collaborate on
                voice messages
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="font-medium text-gray-700">
                      Organization Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      required
                      className="mt-1"
                    />
                    <p className="mt-1 text-gray-500 text-sm">
                      Choose a clear, descriptive name for your organization
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="font-medium text-gray-700"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your organization's purpose and goals"
                      rows={4}
                      className="mt-1"
                    />
                    <p className="mt-1 text-gray-500 text-sm">
                      Optional: Provide context about what your organization
                      does
                    </p>
                  </div>
                </div>

                {/* Features Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100 rounded-lg">
                  <h3 className="mb-3 font-semibold text-blue-900">
                    What you'll get with your organization:
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-center">
                      <Users className="mr-2 w-4 h-4 text-blue-600" />
                      Team collaboration and voice message sharing
                    </li>
                    <li className="flex items-center">
                      <Building2 className="mr-2 w-4 h-4 text-blue-600" />
                      Multiple teams within your organization
                    </li>
                    <li className="flex items-center">
                      <Copy className="mr-2 w-4 h-4 text-blue-600" />
                      Unique invite codes for team members
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 w-4 h-4 text-blue-600" />
                      Role-based permissions and access control
                    </li>
                  </ul>
                </div>

                <div className="flex sm:flex-row flex-col gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.name.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700"
                  >
                    {isLoading ? "Creating..." : "Create Organization"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
