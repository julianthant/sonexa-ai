import { Users, Plus, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CollaborationPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2 font-bold text-gray-900 text-3xl">
            Team Collaboration
          </h1>
          <p className="text-gray-600">
            Manage team members and collaborative projects.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          Invite Member
        </Button>
      </div>

      {/* Team Overview */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Total Members
                </p>
                <p className="font-bold text-gray-900 text-3xl">24</p>
                <p className="mt-1 text-green-600 text-sm">+3 this week</p>
              </div>
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Active Projects
                </p>
                <p className="font-bold text-gray-900 text-3xl">8</p>
                <p className="mt-1 text-blue-600 text-sm">2 new projects</p>
              </div>
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Messages Today
                </p>
                <p className="font-bold text-gray-900 text-3xl">156</p>
                <p className="mt-1 text-green-600 text-sm">
                  +18% from yesterday
                </p>
              </div>
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Team Lead",
                status: "online",
                avatar: "SJ",
              },
              {
                name: "Mike Chen",
                role: "Developer",
                status: "away",
                avatar: "MC",
              },
              {
                name: "Emily Davis",
                role: "Designer",
                status: "online",
                avatar: "ED",
              },
              {
                name: "John Smith",
                role: "Product Manager",
                status: "offline",
                avatar: "JS",
              },
              {
                name: "Lisa Wang",
                role: "QA Engineer",
                status: "online",
                avatar: "LW",
              },
              {
                name: "David Brown",
                role: "Developer",
                status: "away",
                avatar: "DB",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 hover:bg-gray-50 p-3 border rounded-lg transition-colors"
              >
                <div className="flex justify-center items-center bg-blue-500 rounded-full w-10 h-10 font-medium text-white text-sm">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {member.name}
                  </p>
                  <p className="text-gray-500 text-xs">{member.role}</p>
                </div>
                <Badge
                  variant={
                    member.status === "online"
                      ? "default"
                      : member.status === "away"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
