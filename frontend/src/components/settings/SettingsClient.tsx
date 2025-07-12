"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Users,
  Building2,
  Key,
  Database,
  Palette,
  Globe,
  MessageSquare,
} from "lucide-react";

interface SettingsData {
  customVoiceEmail: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  timezone: string;
  company: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  voiceMessageID: string;
  responseLanguage: string;
  processingMode: string;
  responseTone: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  notificationFrequency: string;
  companyIdentifier: string;
  emailVerificationStatus: "pending" | "verified" | "failed";
  lastVerificationAttempt?: Date;
}

interface SettingsClientProps {
  initialSettings: SettingsData;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter();

  const handleSectionClick = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      {/* Personal Settings */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 text-xl">
          Personal settings
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/personal-details")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Personal details
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Personal details, password, communication preferences, and
                    your active sessions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              handleSectionClick("/settings/communication-preferences")
            }
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Communication preferences
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Customize the emails, SMS, and push notifications you
                    receive.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/developers")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-purple-100 rounded-lg w-10 h-10">
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Developers</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Webhooks, developer tools, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 text-xl">
          Account settings
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/business")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-orange-100 rounded-lg w-10 h-10">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Business</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Account details, account health, public info, payouts, legal
                    entity, custom domains, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/team-security")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-emerald-100 rounded-lg w-10 h-10">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Team and security
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Team members, roles, account security, authorized apps, and
                    shared resources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/plans")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-cyan-100 rounded-lg w-10 h-10">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Your plans</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Manage how you pay for Voice AI services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/compliance")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                  <Database className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Compliance and documents
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    PCI compliance, documents, and legacy reports.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/product-previews")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-10 h-10">
                  <MessageSquare className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Product previews
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Try out new features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/perks")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-pink-100 rounded-lg w-10 h-10">
                  <Palette className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Perks</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Discounts on tools to run your startup.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Settings */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 text-xl">
          Product settings
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/billing")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-indigo-100 rounded-lg w-10 h-10">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Billing</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Subscriptions, invoices, quotes, and customer portal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/payments")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-teal-100 rounded-lg w-10 h-10">
                  <Globe className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Payments</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Checkout, payment methods, currency conversion, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              handleSectionClick("/settings/financial-connections")
            }
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-amber-100 rounded-lg w-10 h-10">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Financial Connections
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Appearance, featured institutions, optimizations, and usage
                    details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/identity")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-gray-100 rounded-lg w-10 h-10">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Identity</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Synthetic identity protection and native mobile SDK.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/radar")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Radar</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Manage fraud protection and customization capabilities for
                    your account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSectionClick("/settings/sigma")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sigma</h3>
                  <p className="mt-1 text-gray-600 text-sm">
                    Manage your Sigma features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
