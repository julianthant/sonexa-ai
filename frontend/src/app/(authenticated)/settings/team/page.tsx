import Link from "next/link";
import { Users, Plus, Crown, Shield, UserX, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function TeamPage() {
  const tabs = [
    { id: "team", name: "Team", active: true },
    { id: "sso", name: "Single sign-on (SSO)", active: false },
    { id: "2fa", name: "Two-step authentication", active: false },
    { id: "security", name: "Security history", active: false },
    { id: "apps", name: "Installed apps", active: false },
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
            Team and security
          </h1>
          <p className="text-gray-600 text-sm">
            Manage team members, roles, and security settings
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/settings/team?tab=${tab.id}`}
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

      {/* Team Members */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Team Members</h2>
          <Button>
            <Plus className="mr-2 w-4 h-4" />
            Invite Member
          </Button>
        </div>

        <div className="space-y-3">
          {/* Owner */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-full w-10 h-10">
                <span className="font-medium text-purple-600 text-sm">JT</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">Julian Thant</h3>
                  <span className="bg-purple-100 px-2 py-1 rounded text-purple-800 text-xs">
                    Owner
                  </span>
                </div>
                <p className="text-gray-600 text-sm">julian@sonexa.ai</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-yellow-500" />
            </div>
          </div>

          {/* Admin */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                <span className="font-medium text-blue-600 text-sm">AS</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">Alex Smith</h3>
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs">
                    Admin
                  </span>
                </div>
                <p className="text-gray-600 text-sm">alex@sonexa.ai</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Edit Role
              </Button>
              <Button variant="outline" size="sm">
                <UserX className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>

          {/* Member */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                <span className="font-medium text-green-600 text-sm">MJ</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">Maria Johnson</h3>
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-800 text-xs">
                    Member
                  </span>
                </div>
                <p className="text-gray-600 text-sm">maria@sonexa.ai</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Edit Role
              </Button>
              <Button variant="outline" size="sm">
                <UserX className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Pending Invitations</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-yellow-50 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-10 h-10">
                <Mail className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">sarah@company.com</h3>
                <p className="text-gray-600 text-sm">
                  Invited 2 days ago • Member role
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Resend
              </Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Permissions */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Role Permissions</h2>

        <div className="space-y-4">
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="mb-3 font-medium text-gray-900">
              Admin Permissions
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Manage team members
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Add, remove, and edit team member roles
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Access analytics
                  </h4>
                  <p className="text-gray-600 text-sm">
                    View organization analytics and reports
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Manage billing
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Access billing and payment information
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="mb-3 font-medium text-gray-900">
              Member Permissions
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Create voice messages
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Create and send voice messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Share messages
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Share voice messages with team
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Export data
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Export voice messages and data
                  </p>
                </div>
                <Switch />
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
                Two-factor authentication required
              </h3>
              <p className="text-gray-600 text-sm">
                Require all team members to enable 2FA
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Single sign-on (SSO)
              </h3>
              <p className="text-gray-600 text-sm">
                Enable SSO for team authentication
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Session timeout</h3>
              <p className="text-gray-600 text-sm">
                Automatically log out inactive users after 24 hours
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Recent Activity</h2>
          <Link
            href="/settings/team/audit"
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            View audit log
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Alex Smith enabled 2FA
                </h3>
                <p className="text-gray-600 text-sm">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Maria Johnson joined the team
                </h3>
                <p className="text-gray-600 text-sm">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
