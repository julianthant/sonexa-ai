import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// API functions
const api = {
  analytics: {
    getDashboard: async (days: number = 30) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/analytics/dashboard?days=${days}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch analytics");
      return response.json();
    },
    getVoiceMessages: async (startDate?: string, endDate?: string) => {
      const token = localStorage.getItem("authToken");
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(`/api/analytics/voice-messages?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error("Failed to fetch voice message analytics");
      return response.json();
    },
    getPerformance: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/analytics/performance", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch performance metrics");
      return response.json();
    },
  },
};

// Analytics hooks
export const useAnalyticsDashboard = (days: number = 30) => {
  return useQuery({
    queryKey: ["analytics", "dashboard", days],
    queryFn: () => api.analytics.getDashboard(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useVoiceMessageAnalytics = (
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["analytics", "voice-messages", startDate, endDate],
    queryFn: () => api.analytics.getVoiceMessages(startDate, endDate),
    staleTime: 3 * 60 * 1000, // 3 minutes
    enabled: true,
  });
};

export const usePerformanceMetrics = () => {
  return useQuery({
    queryKey: ["analytics", "performance"],
    queryFn: api.analytics.getPerformance,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
