"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Download,
  Search,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  MoreHorizontal,
  Eye,
  Archive,
  Trash2,
  RefreshCw,
  X,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  VoiceMessage,
  VoiceMessagesResponse,
  fetchVoiceMessages,
  updateVoiceMessageStatus,
} from "@/data/voiceMessages";

interface VoiceArchiveClientProps {
  initialData: VoiceMessagesResponse;
}

const statusColors = {
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  quarantined: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
};

const priorityColors = {
  high: "bg-red-50 border-red-200",
  medium: "bg-yellow-50 border-yellow-200",
  low: "bg-green-50 border-green-200",
};

const sentimentColors = {
  positive: "text-green-600",
  negative: "text-red-600",
  neutral: "text-gray-600",
};

export function VoiceArchiveClient({ initialData }: VoiceArchiveClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<VoiceMessage | null>(
    null
  );
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();

  // Use initial data from server and setup client-side refetching
  const {
    data: messagesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["voiceMessages", currentPage, searchTerm, statusFilter],
    queryFn: () =>
      fetchVoiceMessages({
        page: currentPage,
        search: searchTerm,
        status: statusFilter,
      }),
    initialData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateMessageStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateVoiceMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voiceMessages"] });
      toast.success("Message status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update message status");
    },
  });

  const playAudio = (audioUrl: string, messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
      return;
    }

    if (audioUrl) {
      setPlayingAudio(messageId);
      // In a real app, you would handle actual audio playback
      setTimeout(() => setPlayingAudio(null), 3000); // Mock playback
    } else {
      toast.error("No audio file available");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusCounts = () => {
    const messages = messagesData?.content || [];
    return {
      accepted: messages.filter((m) => m.status === "accepted").length,
      rejected: messages.filter((m) => m.status === "rejected").length,
      quarantined: messages.filter((m) => m.status === "quarantined").length,
      processing: messages.filter((m) => m.status === "processing").length,
    };
  };

  const statusCounts = getStatusCounts();
  const messages = messagesData?.content || [];

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 w-12 h-12 text-red-500" />
          <h3 className="mb-2 font-semibold text-gray-900 text-lg">
            Failed to load voice messages
          </h3>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["voiceMessages"] })
            }
            variant="outline"
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex sm:flex-row flex-col gap-4">
        <div className="relative flex-1">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search voice messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="accepted">
              Accepted ({statusCounts.accepted})
            </SelectItem>
            <SelectItem value="rejected">
              Rejected ({statusCounts.rejected})
            </SelectItem>
            <SelectItem value="quarantined">
              Quarantined ({statusCounts.quarantined})
            </SelectItem>
            <SelectItem value="processing">
              Processing ({statusCounts.processing})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages Grid */}
      <div className="gap-4 grid">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="bg-gray-200 rounded w-3/4 h-4"></div>
                    <div className="bg-gray-200 rounded w-1/2 h-3"></div>
                    <div className="bg-gray-200 rounded w-1/4 h-3"></div>
                  </div>
                  <div className="bg-gray-200 rounded w-20 h-6"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="mx-auto mb-4 w-12 h-12 text-gray-400" />
              <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                No voice messages found
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Voice messages will appear here when received."}
              </p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card
              key={message.id}
              className={`transition-all duration-200 hover:shadow-md border ${
                priorityColors[message.priority || "low"]
              }`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className={`${statusColors[message.status]} border`}
                        variant="outline"
                      >
                        {message.status.charAt(0).toUpperCase() +
                          message.status.slice(1)}
                      </Badge>
                      {message.priority && (
                        <Badge
                          variant="outline"
                          className={`${
                            priorityColors[message.priority]
                          } border text-xs`}
                        >
                          {message.priority.toUpperCase()} PRIORITY
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 font-medium text-gray-900 leading-relaxed">
                      {message.messageContent}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(message.createdAt)}
                      </div>
                      {message.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(message.duration)}
                        </div>
                      )}
                      {message.sentiment && (
                        <div
                          className={`flex items-center gap-1 ${
                            sentimentColors[message.sentiment]
                          }`}
                        >
                          <div className="bg-current rounded-full w-2 h-2"></div>
                          {message.sentiment.charAt(0).toUpperCase() +
                            message.sentiment.slice(1)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {message.audioFileUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          playAudio(message.audioFileUrl!, message.id)
                        }
                        className="p-0 w-9 h-9"
                      >
                        {playingAudio === message.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                    <Select
                      value={message.status}
                      onValueChange={(status) =>
                        updateMessageStatus.mutate({ id: message.id, status })
                      }
                    >
                      <SelectTrigger className="w-32 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accepted">Accept</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                        <SelectItem value="quarantined">Quarantine</SelectItem>
                        <SelectItem value="processing">Process</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMessage(message)}
                      className="p-0 w-9 h-9"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {message.aiAnalysis && (
                  <div className="bg-blue-50 mt-4 p-3 border border-blue-200 rounded-md">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="flex-shrink-0 mt-0.5 w-4 h-4 text-blue-600" />
                      <div>
                        <p className="mb-1 font-medium text-blue-900 text-sm">
                          AI Analysis
                        </p>
                        <p className="text-blue-800 text-sm">
                          {message.aiAnalysis}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {messagesData && messagesData.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            Showing {messages.length} of {messagesData.totalElements} messages
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="text-gray-600 text-sm">
              Page {currentPage + 1} of {messagesData.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(
                  Math.min(messagesData.totalPages - 1, currentPage + 1)
                )
              }
              disabled={currentPage >= messagesData.totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Voice Message Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                  className="p-0 w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-medium text-gray-700 text-sm">
                  Message Content
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedMessage.messageContent}
                </p>
              </div>
              <div className="gap-4 grid grid-cols-2">
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Status
                  </label>
                  <Badge
                    className={`${
                      statusColors[selectedMessage.status]
                    } border mt-1`}
                  >
                    {selectedMessage.status.charAt(0).toUpperCase() +
                      selectedMessage.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Duration
                  </label>
                  <p className="mt-1 text-gray-900">
                    {selectedMessage.duration
                      ? formatDuration(selectedMessage.duration)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700 text-sm">
                  AI Analysis
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedMessage.aiAnalysis || "No analysis available"}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-700 text-sm">
                  Created
                </label>
                <p className="mt-1 text-gray-900">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
