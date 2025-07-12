"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
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
  UserCircle,
  Settings,
  CreditCard,
  BarChart3,
  FileText,
  Mic,
  Globe,
  Zap,
  Cpu,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Upload,
  Activity,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Shield,
  Download,
  Filter,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { DashboardMetrics, RecentActivity } from "@/data/dashboard";
import { ChatBot } from "@/components/chat/ChatBot";

interface DashboardClientProps {
  metrics: DashboardMetrics;
  recentActivity: RecentActivity[];
}

export function DashboardClient({
  metrics,
  recentActivity,
}: DashboardClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const statusItems = [
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
      icon: Eye,
      title: "Quarantined",
      value: metrics.quarantinedMessages,
      percentage: (metrics.quarantinedMessages / metrics.totalMessages) * 100,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
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
    {
      icon: Cpu,
      title: "Storage Used",
      value: `${metrics.storageUsed}%`,
      subtitle: "Of 1TB total",
      trend: "down",
      trendValue: "-5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Activity,
      title: "AI Accuracy",
      value: "96.8%",
      subtitle: "Message classification",
      trend: "up",
      trendValue: "+2.1%",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
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
      title: "Drag & Drop Messages",
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
      icon: Briefcase,
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
    {
      icon: Settings,
      title: "Settings",
      description: "Configure your account and preferences",
      href: "/settings",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <AuthHydration>
        {/* Header */}
        <div className="top-0 z-40 sticky bg-white border-gray-200 border-b">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-10 h-10">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-2xl">
                    Sonexa AI Dashboard
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Welcome back! Here's what's happening with your voice
                    messages.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-3 h-3"></span>
                  </Button>

                  {showNotifications && (
                    <div className="right-0 z-50 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-md ring-1 ring-black w-80">
                      <div className="p-4">
                        <h3 className="mb-3 font-semibold text-gray-900 text-sm">
                          Recent Activity
                        </h3>
                        <div className="space-y-3">
                          {recentActivity.slice(0, 3).map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start space-x-3"
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
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
                                <MessageSquare
                                  className={`w-4 h-4 ${
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
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">
                                  {activity.title}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {activity.description}
                                </p>
                                <p className="mt-1 text-gray-400 text-xs">
                                  {activity.timestamp}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-gray-200 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-center w-full"
                            onClick={() => router.push("/voice-messages")}
                          >
                            View all activity
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="w-5 h-5" />
                </Button>

                {/* Profile */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/settings")}
                >
                  <UserCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm border-0 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-blue-100 text-sm">
                      Total Messages
                    </p>
                    <p className="font-bold text-3xl">
                      {metrics.totalMessages.toLocaleString()}
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-blue-100 text-sm">
                    <TrendingUp className="mr-1 w-4 h-4" />
                    <span>+{metrics.newMessagesToday} today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {statusItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`border ${item.borderColor} ${item.bgColor}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-600 text-sm">
                          {item.title}
                        </p>
                        <p className="font-bold text-gray-900 text-2xl">
                          {item.value.toLocaleString()}
                        </p>
                      </div>
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full w-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.title === "Accepted"
                              ? "bg-green-500"
                              : item.title === "Rejected"
                              ? "bg-red-500"
                              : item.title === "Quarantined"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-gray-500 text-xs">
                        {item.percentage?.toFixed(1)}% of total
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions & Productivity Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:items-start gap-8 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Actions */}
            <Card className="shadow-sm border-0 h-full">
              <CardHeader>
                <CardTitle className="font-semibold text-gray-900 text-lg">
                  Actions
                </CardTitle>
                <CardDescription>
                  Access your most used features quickly
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="gap-4 grid grid-cols-1">
                  {quickActions.map((action) => (
                    <div
                      key={action.title}
                      className="flex items-center p-4 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors cursor-pointer"
                      onClick={() => router.push(action.href)}
                    >
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`w-6 h-6 ${action.color}`} />
                      </div>
                      <div className="flex-1 ml-4">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <p className="text-gray-500 text-xs">
                          {action.description}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productivity Center */}
            <Card className="shadow-sm border-0 h-full">
              <CardHeader>
                <CardTitle className="font-semibold text-gray-900 text-lg">
                  Productivity Center
                </CardTitle>
                <CardDescription>
                  Your daily overview and quick insights
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {/* Today's Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-blue-900 text-sm">
                        Today's Summary
                      </h4>
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="gap-4 grid grid-cols-2">
                      <div>
                        <p className="text-blue-700 text-xs">
                          Messages Processed
                        </p>
                        <p className="font-semibold text-blue-900">
                          {metrics.newMessagesToday}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700 text-xs">
                          Processing Speed
                        </p>
                        <p className="font-semibold text-blue-900">
                          {metrics.processingSpeed}s avg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-green-900 text-sm">
                        System Health
                      </h4>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Progress
                          value={metrics.systemUptime}
                          className="h-2"
                        />
                      </div>
                      <span className="font-semibold text-green-900 text-sm">
                        {metrics.systemUptime}%
                      </span>
                    </div>
                    <p className="mt-1 text-green-700 text-xs">
                      All systems operational
                    </p>
                  </div>

                  {/* Storage Overview */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-orange-900 text-sm">
                        Storage Overview
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

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 border border-purple-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-purple-900 text-sm">
                        Quick Stats
                      </h4>
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="gap-4 grid grid-cols-2">
                      <div>
                        <p className="text-purple-700 text-xs">
                          Total Messages
                        </p>
                        <p className="font-semibold text-purple-900">
                          {metrics.totalMessages.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-700 text-xs">Response Time</p>
                        <p className="font-semibold text-purple-900">
                          {metrics.averageResponseTime}s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AuthHydration>

      {/* ChatBot in bottom right corner */}
      <ChatBot />
    </div>
  );
}
