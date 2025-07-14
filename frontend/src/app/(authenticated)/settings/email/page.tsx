import Link from "next/link";
import { Mail, Plus, Settings2, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function EmailIntegrationPage() {
  const tabs = [
    { id: "services", name: "Connected Services", active: true },
    { id: "templates", name: "Email Templates", active: false },
    { id: "filters", name: "Filters & Rules", active: false },
    { id: "settings", name: "Settings", active: false },
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
            Email Integration
          </h1>
          <p className="text-gray-600 text-sm">
            Connect email services and manage voice message email integrations
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/settings/email?tab=${tab.id}`}
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

      {/* Connected Email Services */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Connected Services</h2>

        <div className="space-y-3">
          {/* Gmail Integration */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Gmail</h3>
                <p className="text-gray-600 text-sm">
                  Connected to john.doe@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>

          {/* Outlook Integration */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <AtSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Outlook</h3>
                <p className="text-gray-600 text-sm">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 w-4 h-4" />
              Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Email Forwarding Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">
          Voice Message Email Settings
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Auto-forward voice messages
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically forward voice messages to connected email accounts
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Include transcription
              </h3>
              <p className="text-gray-600 text-sm">
                Include AI-generated transcription in forwarded emails
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Email notifications</h3>
              <p className="text-gray-600 text-sm">
                Send email notifications for new voice messages
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Email Templates</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">
                Voice Message Forward Template
              </h3>
              <p className="text-gray-600 text-sm">
                Customize the email template for forwarded voice messages
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 w-4 h-4" />
              Edit Template
            </Button>
          </div>

          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">
                Notification Template
              </h3>
              <p className="text-gray-600 text-sm">
                Customize the email template for voice message notifications
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 w-4 h-4" />
              Edit Template
            </Button>
          </div>
        </div>
      </div>

      {/* Email Filters */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Email Filters</h2>

        <div className="space-y-3">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">
                Priority Messages Only
              </h3>
              <Switch />
            </div>
            <p className="text-gray-600 text-sm">
              Only forward voice messages marked as high priority
            </p>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">Keyword Filtering</h3>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              Set up keyword filters to automatically categorize voice messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
