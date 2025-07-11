"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
import {
  ChartBarIcon,
  ArrowLeftIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

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

export default function AnalyticsPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  if (!isHydrated || !isAuthenticated) {
    return (
      <AuthHydration>
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen" />
      </AuthHydration>
    );
  }

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
          }/analytics?timeRange=${timeRange}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          // Mock data for demo
          setStats({
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
          });
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        // Use mock data on error
        setStats({
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
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const calculateGrowth = () => {
    if (!stats) return 0;
    const growth =
      ((stats.currentMonthUsage - stats.previousMonthUsage) /
        stats.previousMonthUsage) *
      100;
    return Math.round(growth);
  };

  const getMaxUsage = () => {
    if (!stats?.dailyUsage) return 0;
    return Math.max(...stats.dailyUsage.map((d) => d.count));
  };

  return (
    <AuthHydration>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg border-white/20 border-b"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <motion.button
                  onClick={() => router.push("/dashboard")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 mr-6 text-purple-300 hover:text-purple-100 transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </motion.button>

                <motion.h1
                  className="flex items-center bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold text-transparent text-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <ChartBarIcon className="mr-3 w-8 h-8 text-purple-400" />
                  Analytics & Usage
                </motion.h1>
              </div>

              {/* Time Range Selector */}
              <div className="flex space-x-2">
                {["7d", "30d", "90d"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? "bg-purple-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {range === "7d"
                      ? "7 Days"
                      : range === "30d"
                      ? "30 Days"
                      : "90 Days"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="relative">
                <div className="border-purple-400 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
                <div
                  className="absolute inset-0 border-t-2 border-blue-400 rounded-full w-12 h-12 animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Cards */}
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Total Requests</p>
                      <p className="font-bold text-white text-2xl">
                        {stats?.totalRequests || 0}
                      </p>
                    </div>
                    <CpuChipIcon className="w-8 h-8 text-purple-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Chat Messages</p>
                      <p className="font-bold text-white text-2xl">
                        {stats?.chatMessages || 0}
                      </p>
                    </div>
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Documents</p>
                      <p className="font-bold text-white text-2xl">
                        {stats?.documentsProcessed || 0}
                      </p>
                    </div>
                    <DocumentTextIcon className="w-8 h-8 text-green-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Text-to-Speech</p>
                      <p className="font-bold text-white text-2xl">
                        {stats?.textToSpeechConversions || 0}
                      </p>
                    </div>
                    <SpeakerWaveIcon className="w-8 h-8 text-orange-400" />
                  </div>
                </motion.div>
              </div>

              {/* Usage Trend and Top Features */}
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                {/* Usage Trend */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="flex items-center font-semibold text-white text-xl">
                      <ArrowTrendingUpIcon className="mr-2 w-6 h-6 text-green-400" />
                      Usage Trend
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span
                        className={`flex items-center ${
                          calculateGrowth() >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <ArrowTrendingUpIcon
                          className={`w-4 h-4 mr-1 ${
                            calculateGrowth() < 0 ? "rotate-180" : ""
                          }`}
                        />
                        {Math.abs(calculateGrowth())}%
                      </span>
                      <span className="text-gray-300">vs last month</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {stats?.dailyUsage.map((day, index) => (
                      <div
                        key={day.date}
                        className="flex items-center space-x-3"
                      >
                        <span className="w-12 text-gray-300 text-xs">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(day.count / getMaxUsage()) * 100}%`,
                            }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              duration: 0.5,
                            }}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2"
                          />
                        </div>
                        <span className="w-8 text-white text-xs text-right">
                          {day.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Top Features */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
                >
                  <h3 className="flex items-center mb-6 font-semibold text-white text-xl">
                    <ChartBarIcon className="mr-2 w-6 h-6 text-purple-400" />
                    Top Features
                  </h3>

                  <div className="space-y-4">
                    {stats?.topFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg w-8 h-8 font-semibold text-white text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-white">
                              {feature.feature}
                            </span>
                            <span className="text-gray-300 text-sm">
                              {feature.usage}
                            </span>
                          </div>
                          <div className="bg-white/10 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (feature.usage / (stats.totalRequests || 1)) *
                                  100
                                }%`,
                              }}
                              transition={{
                                delay: 0.8 + index * 0.1,
                                duration: 0.5,
                              }}
                              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Account Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl"
              >
                <h3 className="flex items-center mb-6 font-semibold text-white text-xl">
                  <CalendarIcon className="mr-2 w-6 h-6 text-blue-400" />
                  Account Summary
                </h3>

                <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mb-1 font-bold text-white text-2xl">
                      {user?.subscription_tier || "Free"}
                    </div>
                    <div className="text-gray-300 text-sm">Current Plan</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 font-bold text-white text-2xl">
                      {user?.subscription_tier === "free"
                        ? "Azure AI"
                        : "OpenAI"}
                    </div>
                    <div className="text-gray-300 text-sm">AI Provider</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center mb-1 font-bold text-white text-2xl">
                      <ClockIcon className="mr-1 w-6 h-6" />
                      Active
                    </div>
                    <div className="text-gray-300 text-sm">Account Status</div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </AuthHydration>
  );
}
