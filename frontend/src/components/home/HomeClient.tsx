"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Upload,
  FileText,
  Users,
  Building2,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Calendar,
  Briefcase,
  Zap,
  Cpu,
} from "lucide-react";
import { DashboardMetrics, RecentActivity } from "@/data/dashboard";

interface HomeClientProps {
  metrics: DashboardMetrics;
  recentActivity: RecentActivity[];
}

export function HomeClient({ metrics, recentActivity }: HomeClientProps) {
  const stats = [
    {
      icon: MessageSquare,
      title: "Total Messages",
      value: metrics.totalMessages.toLocaleString(),
      subtitle: "All time",
      trend: "up",
      trendValue: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calendar,
      title: "Today's Messages",
      value: metrics.newMessagesToday,
      subtitle: "New today",
      trend: "up",
      trendValue: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CheckCircle,
      title: "Accepted",
      value: metrics.acceptedMessages,
      percentage: (metrics.acceptedMessages / metrics.totalMessages) * 100,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: AlertTriangle,
      title: "Rejected",
      value: metrics.rejectedMessages,
      percentage: (metrics.rejectedMessages / metrics.totalMessages) * 100,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: Clock,
      title: "Processing",
      value: metrics.processingMessages,
      percentage: (metrics.processingMessages / metrics.totalMessages) * 100,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Zap,
      title: "Processing Speed",
      value: `${metrics.processingSpeed}s`,
      subtitle: "Avg. per message",
      trend: "up",
      trendValue: "+12%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Voice Messages",
      description: "View and manage voice messages",
      href: "/voice-messages",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Upload,
      title: "Upload Messages",
      description: "Upload voice messages via drag and drop",
      href: "/voice-upload",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: FileText,
      title: "CSV Upload",
      description: "Upload and process CSV documents",
      href: "/csv-upload",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and collaborate on voicemails",
      href: "/collaboration",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Building2,
      title: "Create Organization",
      description: "Set up a new organization for your team",
      href: "/organizations/create",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "View detailed analytics and reports",
      href: "/analytics",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Welcome back!</h1>
        <p className="text-gray-600">
          Here's what's happening with your voice messages today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 text-sm">
                        {stat.title}
                      </h3>
                      <p className="font-bold text-gray-900 text-2xl">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-gray-500 text-sm">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {stat.trend && (
                    <div
                      className={`flex items-center space-x-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium text-sm">
                        {stat.trendValue}
                      </span>
                    </div>
                  )}
                </div>

                {stat.percentage !== undefined && (
                  <div className="mt-4">
                    <Progress value={stat.percentage} className="h-2" />
                    <p className="mt-1 text-gray-500 text-xs">
                      {stat.percentage.toFixed(1)}% of total
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="font-semibold text-gray-900 text-lg">
              Quick Actions
            </CardTitle>
            <CardDescription>
              Access your most used features quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="gap-3 grid grid-cols-1">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  className="flex items-center p-4 border border-gray-200 hover:border-gray-300 rounded-lg text-left transition-colors"
                >
                  <div className={`p-3 rounded-lg ${action.bgColor} mr-4`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {action.title}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {action.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="font-semibold text-gray-900 text-lg">
              System Overview
            </CardTitle>
            <CardDescription>
              Current system status and performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* System Health */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-900 text-sm">
                  System Uptime
                </h4>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Progress value={metrics.systemUptime} className="h-2" />
                </div>
                <span className="font-semibold text-green-900 text-sm">
                  {metrics.systemUptime}%
                </span>
              </div>
              <p className="mt-1 text-green-700 text-xs">
                All systems operational
              </p>
            </div>

            {/* Storage */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-orange-900 text-sm">
                  Storage Usage
                </h4>
                <Briefcase className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Progress value={metrics.storageUsed} className="h-2" />
                </div>
                <span className="font-semibold text-orange-900 text-sm">
                  {metrics.storageUsed}%
                </span>
              </div>
              <p className="mt-1 text-orange-700 text-xs">
                Storage usage within normal range
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 border border-purple-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-purple-900 text-sm">
                  Average Response Time
                </h4>
                <Cpu className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="font-bold text-purple-900 text-2xl">
                  {metrics.averageResponseTime}s
                </p>
                <p className="text-purple-700 text-xs">
                  Processing time per message
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-semibold text-gray-900 text-lg">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest system events and notifications
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="mr-2 w-4 h-4" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === "success"
                      ? "bg-green-100"
                      : activity.status === "error"
                      ? "bg-red-100"
                      : activity.status === "warning"
                      ? "bg-yellow-100"
                      : activity.status === "pending"
                      ? "bg-orange-100"
                      : "bg-blue-100"
                  }`}
                >
                  {activity.type === "email_verification" ? (
                    <MessageSquare
                      className={`w-5 h-5 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : activity.status === "error"
                          ? "text-red-600"
                          : activity.status === "warning"
                          ? "text-yellow-600"
                          : activity.status === "pending"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    />
                  ) : activity.type === "team_activity" ? (
                    <Users
                      className={`w-5 h-5 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : activity.status === "error"
                          ? "text-red-600"
                          : activity.status === "warning"
                          ? "text-yellow-600"
                          : activity.status === "pending"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    />
                  ) : (
                    <CheckCircle
                      className={`w-5 h-5 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : activity.status === "error"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    {activity.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {activity.description}
                  </p>
                  <p className="mt-1 text-gray-400 text-xs">
                    {activity.timestamp}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    activity.status === "success"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "error"
                      ? "bg-red-100 text-red-800"
                      : activity.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : activity.status === "pending"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
