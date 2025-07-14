import Link from "next/link";
import { ChevronLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PersonalDetailsPage() {
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
            Personal details
          </h1>
        </div>
      </div>

      {/* User Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 font-bold text-gray-900 text-lg">User</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Edit className="mr-1 w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label
                htmlFor="email"
                className="font-medium text-gray-700 text-sm"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value="julian@sonexa.ai"
                className="mt-1"
                readOnly
              />
            </div>
            <div>
              <Label
                htmlFor="firstName"
                className="font-medium text-gray-700 text-sm"
              >
                First name
              </Label>
              <Input id="firstName" value="Julian" className="mt-1" readOnly />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label
                htmlFor="lastName"
                className="font-medium text-gray-700 text-sm"
              >
                Last name
              </Label>
              <Input id="lastName" value="Thant" className="mt-1" readOnly />
            </div>
            <div>
              <Label
                htmlFor="company"
                className="font-medium text-gray-700 text-sm"
              >
                Company
              </Label>
              <Input id="company" value="Sonexa AI" className="mt-1" readOnly />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label
                htmlFor="phoneNumber"
                className="font-medium text-gray-700 text-sm"
              >
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                value="+1 (555) 123-4567"
                className="mt-1"
                readOnly
              />
            </div>
            <div>
              <Label
                htmlFor="voiceEmail"
                className="font-medium text-gray-700 text-sm"
              >
                Voice email
              </Label>
              <Input
                id="voiceEmail"
                value="julian@voice.sonexa.ai"
                className="mt-1"
                readOnly
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="password"
              className="font-medium text-gray-700 text-sm"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value="••••••••"
              className="mt-1"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Two-factor authentication */}
      <div className="pt-8 border-t">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              Two-factor authentication
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Increase security for your account by using multiple
              authentication methods.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Add authentication method
          </Button>
        </div>

        <p className="text-gray-600 text-sm">
          You can enable text messages, authenticator apps, or hardware security
          keys. If you want to enable Touch ID or Windows Hello you must enable
          another step first.
        </p>
      </div>

      {/* Connected Accounts */}
      <div className="pt-8 border-t">
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 text-lg">
            Connected accounts
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            Connect your Google or Microsoft account for easier sign-in and integration.
          </p>
        </div>

        <div className="space-y-3">
          {/* Google Connection */}
          <div className="flex items-center justify-between border border-gray-200 bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Google</h3>
                <p className="text-gray-600 text-sm">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Microsoft Connection */}
          <div className="flex items-center justify-between border border-gray-200 bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#00BCF2" d="M0 0h11.377v11.372H0z"/>
                  <path fill="#00B4A6" d="M12.623 0H24v11.372H12.623z"/>
                  <path fill="#FFB900" d="M0 12.628h11.377V24H0z"/>
                  <path fill="#F25022" d="M12.623 12.628H24V24H12.623z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Microsoft</h3>
                <p className="text-gray-600 text-sm">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Message Settings */}
      <div className="pt-8 border-t">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              Voice message preferences
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Configure how voice messages are processed and handled.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="transcriptionEnabled"
              className="font-medium text-gray-700 text-sm"
            >
              Auto-transcription
            </Label>
            <Select defaultValue="enabled">
              <SelectTrigger className="mt-1 w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="sharingDefault"
              className="font-medium text-gray-700 text-sm"
            >
              Default sharing
            </Label>
            <Select defaultValue="private">
              <SelectTrigger className="mt-1 w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team only</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Login sessions */}
      <div className="pt-8 border-t">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              Login sessions
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Places where you're logged into Sonexa AI.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Sign out all other sessions
          </Button>
        </div>

        <div className="space-y-2">
          <div className="gap-4 grid grid-cols-4 pb-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
            <span>Location</span>
            <span>Device</span>
            <span>IP Address</span>
            <span>Time</span>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="gap-4 grid grid-cols-4 text-sm">
              <span className="text-gray-900">United States (CA)</span>
              <span className="text-gray-600">Chrome - Windows</span>
              <span className="text-gray-600">192.168.1.100</span>
              <span className="flex justify-between items-center text-gray-600">
                2 hours ago
                <span className="bg-green-100 px-2 py-1 rounded text-green-600 text-xs">
                  Current session
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
