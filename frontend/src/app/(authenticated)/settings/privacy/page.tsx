import Link from "next/link";
import { Shield, Eye, Lock, Database, AlertTriangle, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PrivacyPage() {
  const tabs = [
    { id: "privacy", name: "Privacy", active: true },
    { id: "data", name: "Data Management", active: false },
    { id: "security", name: "Advanced Security", active: false },
    { id: "audit", name: "Activity Log", active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/settings"
            className="text-purple-600 hover:text-purple-700"
          >
            Settings
          </Link>
          <span className="text-gray-400">›</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="mb-1 font-bold text-gray-900 text-2xl">
            Privacy & Security
          </h1>
          <p className="text-gray-600 text-sm">
            Manage privacy settings, data usage, and advanced security options
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/settings/privacy?tab=${tab.id}`}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                tab.active
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Privacy Controls */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Privacy Controls</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Profile visibility</h3>
              <p className="text-gray-600 text-sm">
                Control who can see your profile information
              </p>
            </div>
            <Select defaultValue="team">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private (only me)</SelectItem>
                <SelectItem value="team">Team members only</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Voice message analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Allow analysis of voice messages for insights and improvements
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Usage analytics</h3>
              <p className="text-gray-600 text-sm">
                Help improve our services by sharing anonymous usage data
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Marketing communications
              </h3>
              <p className="text-gray-600 text-sm">
                Receive product updates and promotional content
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Data Sharing</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Third-party integrations
              </h3>
              <p className="text-gray-600 text-sm">
                Allow connected apps to access your voice messages
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Research participation
              </h3>
              <p className="text-gray-600 text-sm">
                Participate in research to improve AI voice processing
              </p>
            </div>
            <Switch />
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-10 h-10">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Data portability</h3>
                <p className="mb-3 text-gray-600 text-sm">
                  Download all your data in a portable format
                </p>
                <Button variant="outline" size="sm">
                  Request Data Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Security Settings</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                End-to-end encryption
              </h3>
              <p className="text-gray-600 text-sm">
                Encrypt voice messages for maximum security
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Login notifications</h3>
              <p className="text-gray-600 text-sm">
                Get notified of login attempts from new devices
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <h3 className="mb-2 font-medium text-gray-900">Session timeout</h3>
            <p className="mb-3 text-gray-600 text-sm">
              Automatically log out after a period of inactivity
            </p>
            <Select defaultValue="24h">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="8h">8 hours</SelectItem>
                <SelectItem value="24h">24 hours</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Account Security</h2>

        <div className="space-y-3">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Password strength
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Last changed 3 months ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">API Keys</h3>
                  <p className="text-gray-600 text-sm">
                    Manage your API access keys
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage Keys
              </Button>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                  <Database className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Delete account</h3>
                  <p className="text-gray-600 text-sm">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-red-50 border-red-300 text-red-600"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
