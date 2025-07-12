"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationModal } from "@/components/verification/VerificationModal";
import {
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
import { RecentActivity } from "@/data/dashboard";
import ActivitiesSearch from "./ActivitiesSearch";

interface ActivitiesListProps {
  initialActivities: RecentActivity[];
}

export default function ActivitiesList({
  initialActivities,
}: ActivitiesListProps) {
  const [activities, setActivities] =
    useState<RecentActivity[]>(initialActivities);
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
    <div className="space-y-6">
      <ActivitiesSearch
        onSearchChange={setSearchTerm}
        onFilterTypeChange={setFilterType}
        onFilterStatusChange={setFilterStatus}
      />

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                No activities found matching your criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activity.type === "email_verification" &&
                  activity.status === "pending"
                    ? "hover:bg-purple-50 border-purple-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleActivityClick(activity)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${
                        activity.type === "email_verification"
                          ? "bg-purple-100 text-purple-600"
                          : activity.type === "security"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {activity.title}
                          </h3>
                          <p className="mt-1 text-gray-600 text-sm">
                            {activity.description}
                          </p>
                          <p className="mt-2 text-gray-500 text-xs">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(activity.status)}
                            <Badge
                              className={`${getStatusColor(
                                activity.status
                              )} text-xs`}
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <Badge
                            className={`${getTypeColor(activity.type)} text-xs`}
                          >
                            {activity.type.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={verificationModal.isOpen}
        onClose={() => handleVerificationComplete(false)}
        senderEmail={verificationModal.senderEmail}
        voiceMessageId={verificationModal.voiceMessageId}
        onVerificationComplete={handleVerificationComplete}
      />
    </div>
  );
}
