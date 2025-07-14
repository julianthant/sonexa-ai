import { useState, useCallback } from "react";

interface UsageStats {
  totalRequests: number;
  chatMessages: number;
  documentsProcessed: number;
  textToSpeechConversions: number;
  currentMonthUsage: number;
  previousMonthUsage: number;
  dailyUsage: Array<{ date: string; count: number }>;
  topFeatures: Array<{ feature: string; usage: number }>;
}

const MOCK_STATS: UsageStats = {
  totalRequests: 245,
  chatMessages: 156,
  documentsProcessed: 42,
  textToSpeechConversions: 47,
  currentMonthUsage: 89,
  previousMonthUsage: 67,
  dailyUsage: [
    { date: "2024-01-01", count: 12 },
    { date: "2024-01-02", count: 8 },
    { date: "2024-01-03", count: 15 },
    { date: "2024-01-04", count: 22 },
    { date: "2024-01-05", count: 18 },
    { date: "2024-01-06", count: 25 },
    { date: "2024-01-07", count: 19 },
  ],
  topFeatures: [
    { feature: "Chat AI", usage: 156 },
    { feature: "Text-to-Speech", usage: 47 },
    { feature: "Document Processing", usage: 42 },
  ],
};

export function useAnalytics(timeRange: string = "30d") {
  const [stats, setStats] = useState<UsageStats>(MOCK_STATS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
        }/analytics?timeRange=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        // Use mock data for demo
        setStats(MOCK_STATS);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to fetch analytics data");
      // Use mock data on error
      setStats(MOCK_STATS);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchAnalytics,
  };
}
