import Link from "next/link";
import { Copy, Edit, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function OrganizationPage() {
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
            Organization
          </h1>
        </div>
      </div>

      {/* Organization Details */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 font-bold text-gray-900 text-lg">
            Organization details
          </h2>
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
                htmlFor="orgName"
                className="font-medium text-gray-700 text-sm"
              >
                Organization name
              </Label>
              <Input id="orgName" value="Sonexa AI" className="mt-1" readOnly />
            </div>
            <div>
              <Label
                htmlFor="orgStatus"
                className="font-medium text-gray-700 text-sm"
              >
                Status
              </Label>
              <div className="mt-1">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Active
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Label
              htmlFor="orgDescription"
              className="font-medium text-gray-700 text-sm"
            >
              Description
            </Label>
            <Input
              id="orgDescription"
              value="AI-powered voice message processing and collaboration platform"
              className="mt-1"
              readOnly
            />
          </div>

          <div>
            <Label
              htmlFor="createdAt"
              className="font-medium text-gray-700 text-sm"
            >
              Created
            </Label>
            <Input
              id="createdAt"
              value="January 15, 2024"
              className="mt-1"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Invite Code */}
      <div className="pt-8 border-t">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              Organization invite code
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Share this code with team members to join your organization.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Generate new code
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value="SONEXA-2024-ALPHA"
            className="w-48 font-mono"
            readOnly
          />
          <Button variant="outline" size="sm">
            <Copy className="mr-1 w-4 h-4" />
            Copy
          </Button>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="pt-8 border-t">
        <h2 className="mb-6 font-bold text-gray-900 text-lg">
          Organization overview
        </h2>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700 text-sm">
                Total Members
              </span>
            </div>
            <div className="font-bold text-gray-900 text-2xl">12</div>
            <div className="text-gray-600 text-sm">Across 3 teams</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-700 text-sm">
                Active Teams
              </span>
            </div>
            <div className="font-bold text-gray-900 text-2xl">3</div>
            <div className="text-gray-600 text-sm">
              Engineering, Marketing, Sales
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Edit className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-700 text-sm">
                Voice Messages
              </span>
            </div>
            <div className="font-bold text-gray-900 text-2xl">1,247</div>
            <div className="text-gray-600 text-sm">This month</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pt-8 border-t">
        <h2 className="mb-4 font-bold text-gray-900 text-lg">
          Recent organization activity
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-3 border-gray-100 border-b">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Sarah Johnson joined the organization
                </div>
                <div className="text-gray-600 text-xs">
                  Added to Engineering team
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs">2 hours ago</div>
          </div>

          <div className="flex justify-between items-center py-3 border-gray-100 border-b">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  New team created: Customer Success
                </div>
                <div className="text-gray-600 text-xs">
                  Created by Julian Thant
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs">1 day ago</div>
          </div>

          <div className="flex justify-between items-center py-3 border-gray-100 border-b">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-full w-8 h-8">
                <Edit className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Organization settings updated
                </div>
                <div className="text-gray-600 text-xs">
                  Voice notification preferences changed
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs">3 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
