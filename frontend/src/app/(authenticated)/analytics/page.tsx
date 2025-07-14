import { BarChart3, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Analytics</h1>
        <p className="text-gray-600">
          Track performance and insights for your voice messages.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Messages
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">2,847</div>
            <p className="mt-1 text-green-600 text-xs">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">89</div>
            <p className="mt-1 text-green-600 text-xs">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">76.3%</div>
            <p className="mt-1 text-green-600 text-xs">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Avg. Response Time
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">2.4h</div>
            <p className="mt-1 text-green-600 text-xs">-15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart Placeholder */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Message Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center bg-gray-50 rounded-lg w-full h-64">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 w-12 h-12 text-gray-400" />
              <p className="text-gray-500">Analytics Chart Coming Soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
