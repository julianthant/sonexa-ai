"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VerificationModal } from "@/components/verification/VerificationModal";
import {
  Search,
  Filter,
  Calendar,
  Mail,
  Users,
  Settings,
  Shield,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { mockRecentActivity, RecentActivity } from "@/data/dashboard";

export function ActivitiesClient() {
  const [activities, setActivities] =
    useState<RecentActivity[]>(mockRecentActivity);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [verificationModal, setVerificationModal] = useState<{
    isOpen: boolean;
    senderEmail: string;
    voiceMessageId: string;
  }>({
    isOpen: false,
    senderEmail: "",
    voiceMessageId: "",
  });

  const handleActivityClick = (activity: RecentActivity) => {
    if (
      activity.type === "email_verification" &&
      activity.status === "pending" &&
      activity.voiceMessageId
    ) {
      // Extract email from description (mock logic)
      const emailMatch = activity.description.match(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
      );
      const senderEmail = emailMatch ? emailMatch[1] : "unknown@example.com";

      setVerificationModal({
        isOpen: true,
        senderEmail,
        voiceMessageId: activity.voiceMessageId,
      });
    }
  };

  const handleVerificationComplete = (success: boolean) => {
    if (success) {
      // Update the activity status to verified
      setActivities((prev) =>
        prev.map((activity) =>
          activity.voiceMessageId === verificationModal.voiceMessageId
            ? {
                ...activity,
                status: "success" as const,
                title: "Email verified successfully",
              }
            : activity
        )
      );
    }

    setVerificationModal({
      isOpen: false,
      senderEmail: "",
      voiceMessageId: "",
    });
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesStatus =
      filterStatus === "all" || activity.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email_verification":
        return <Mail className="w-5 h-5" />;
      case "team_activity":
        return <Users className="w-5 h-5" />;
      case "system":
        return <Settings className="w-5 h-5" />;
      case "security":
        return <Shield className="w-5 h-5" />;
      case "notification":
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "info":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email_verification":
        return "bg-purple-100 text-purple-800";
      case "team_activity":
        return "bg-indigo-100 text-indigo-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "notification":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Activities
            </CardTitle>
            <CardDescription>
              Search and filter your activities by type and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email_verification">
                    Email Verification
                  </SelectItem>
                  <SelectItem value="team_activity">Team Activity</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activities ({filteredActivities.length})
              </CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mb-2 text-gray-400">
                  <Search className="mx-auto w-12 h-12" />
                </div>
                <p className="text-gray-500">
                  No activities found matching your filters.
                </p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start space-x-4 p-4 border border-gray-200 rounded-lg transition-colors ${
                    activity.type === "email_verification" &&
                    activity.status === "pending"
                      ? "hover:border-blue-300 cursor-pointer hover:bg-blue-50"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
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
                    <div
                      className={`${
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
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {activity.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <span className="text-gray-400 text-xs">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>

                    <p className="mb-3 text-gray-600 text-sm">
                      {activity.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge
                          variant="secondary"
                          className={getTypeColor(activity.type)}
                        >
                          {activity.type.replace("_", " ")}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(activity.status)}
                        >
                          {activity.status}
                        </Badge>
                      </div>

                      {activity.voiceMessageId && (
                        <div className="font-mono text-gray-500 text-xs">
                          {activity.voiceMessageId}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={verificationModal.isOpen}
        onClose={() =>
          setVerificationModal({
            isOpen: false,
            senderEmail: "",
            voiceMessageId: "",
          })
        }
        senderEmail={verificationModal.senderEmail}
        voiceMessageId={verificationModal.voiceMessageId}
        onVerificationComplete={handleVerificationComplete}
      />
    </div>
  );
}
