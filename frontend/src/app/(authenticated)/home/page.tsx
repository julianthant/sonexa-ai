import Link from "next/link";
import {
  MessageSquare,
  Plus,
  BarChart3,
  Archive,
  Activity,
  Users,
  Bell,
  Send,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your voice messages today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Total Messages
                </p>
                <p className="font-bold text-gray-900 text-3xl">2,847</p>
                <p className="mt-1 text-green-600 text-sm">
                  +12% from last month
                </p>
              </div>
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  New Today
                </p>
                <p className="font-bold text-gray-900 text-3xl">47</p>
                <p className="mt-1 text-green-600 text-sm">
                  +8% from yesterday
                </p>
              </div>
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Processing Speed
                </p>
                <p className="font-bold text-gray-900 text-3xl">2.3s</p>
                <p className="mt-1 text-green-600 text-sm">-15% faster</p>
              </div>
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1 font-medium text-gray-600 text-sm">
                  Storage Used
                </p>
                <p className="font-bold text-gray-900 text-3xl">68.5%</p>
                <p className="mt-1 text-amber-600 text-sm">+5% this week</p>
              </div>
              <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
                <Archive className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 text-xl">
          Quick Actions
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/create-message">
            <Button
              variant="outline"
              className="justify-start hover:bg-green-50 p-4 hover:border-green-200 w-full h-auto"
            >
              <Plus className="mr-3 w-5 h-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Create Message</div>
                <div className="text-gray-500 text-xs">
                  Record new voice message
                </div>
              </div>
            </Button>
          </Link>

          <Link href="/send-message">
            <Button
              variant="outline"
              className="justify-start hover:bg-blue-50 p-4 hover:border-blue-200 w-full h-auto"
            >
              <Send className="mr-3 w-5 h-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Send to Team</div>
                <div className="text-gray-500 text-xs">Quick send message</div>
              </div>
            </Button>
          </Link>

          <Link href="/collaboration">
            <Button
              variant="outline"
              className="justify-start hover:bg-purple-50 p-4 hover:border-purple-200 w-full h-auto"
            >
              <Users className="mr-3 w-5 h-5 text-purple-600" />
              <div className="text-left">
                <div className="font-medium">Team Collaboration</div>
                <div className="text-gray-500 text-xs">Work with teams</div>
              </div>
            </Button>
          </Link>

          <Link href="/analytics">
            <Button
              variant="outline"
              className="justify-start hover:bg-amber-50 p-4 hover:border-amber-200 w-full h-auto"
            >
              <BarChart3 className="mr-3 w-5 h-5 text-amber-600" />
              <div className="text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-gray-500 text-xs">
                  Performance insights
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest updates from your teams and system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Email verified successfully",
                description:
                  "Company verified their email voice+sonexa-vm-12345-abcdef@sonexa.ai",
                time: "2 minutes ago",
                color: "text-green-600 bg-green-100",
              },
              {
                icon: Users,
                title: "Voice message shared",
                description:
                  "Sarah Johnson shared a voice message with the Marketing team",
                time: "5 minutes ago",
                color: "text-blue-600 bg-blue-100",
              },
              {
                icon: Bell,
                title: "New email received",
                description:
                  "Email sent to voice+sonexa-vm-11111-aaaaaa@sonexa.ai awaiting verification",
                time: "8 minutes ago",
                color: "text-amber-600 bg-amber-100",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 hover:bg-gray-50 p-3 rounded-lg"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    {activity.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {activity.description}
                  </p>
                  <p className="mt-1 text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-gray-200 border-t">
            <Link href="/activities">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
