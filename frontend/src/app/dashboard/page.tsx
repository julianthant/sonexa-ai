"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  UserCircleIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  GlobeAltIcon,
  BoltIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading until hydration is complete
  if (!mounted || !isHydrated) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <div className="relative">
          <div className="border-purple-400 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          <div
            className="absolute inset-0 border-t-2 border-blue-400 rounded-full w-12 h-12 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <AuthHydration>
        <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
          <div className="text-white text-center">
            <div className="animate-pulse">
              Please log in to access the dashboard
            </div>
          </div>
        </div>
      </AuthHydration>
    );
  }

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
                <motion.h1
                  className="bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold text-transparent text-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  Sonexa AI Dashboard
                </motion.h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <UserCircleIcon className="w-5 h-5 text-purple-300" />
                  <span className="text-sm">{user.username}</span>
                  <motion.span
                    className="bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 rounded-full font-medium text-xs capitalize"
                    whileHover={{ scale: 1.1 }}
                  >
                    {user.subscription_tier || "free"}
                  </motion.span>
                </div>

                <motion.button
                  onClick={() => router.push("/pricing")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-purple-300 hover:text-purple-100 text-sm transition-colors"
                >
                  <CreditCardIcon className="w-4 h-4" />
                  <span>Upgrade</span>
                </motion.button>

                <motion.button
                  onClick={() => useAuthStore.getState().logout()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm transition-colors"
                >
                  <CogIcon className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
            {/* Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 lg:col-span-1"
            >
              {/* Account Overview */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <h2 className="flex items-center mb-4 font-semibold text-white text-lg">
                  <UserCircleIcon className="mr-2 w-5 h-5 text-purple-300" />
                  Account Overview
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="font-medium text-gray-300 text-sm">
                      Email
                    </label>
                    <p className="text-white text-sm">{user.email}</p>
                  </div>

                  <div>
                    <label className="font-medium text-gray-300 text-sm">
                      Plan
                    </label>
                    <p className="flex items-center text-white text-sm capitalize">
                      {user.subscription_tier || "free"}
                      <BoltIcon className="ml-1 w-4 h-4 text-yellow-400" />
                    </p>
                  </div>

                  <div>
                    <label className="font-medium text-gray-300 text-sm">
                      AI Provider
                    </label>
                    <p className="flex items-center text-white text-sm">
                      {user.subscription_tier === "free"
                        ? "Azure AI"
                        : "OpenAI"}
                      <CpuChipIcon className="ml-1 w-4 h-4 text-blue-400" />
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    onClick={() => router.push("/pricing")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-purple-500 hover:from-purple-600 to-blue-500 hover:to-blue-600 shadow-lg px-4 py-3 rounded-xl w-full font-medium text-white transition-all duration-200"
                  >
                    Upgrade Plan
                  </motion.button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <h3 className="flex items-center mb-4 font-semibold text-white text-lg">
                  <BoltIcon className="mr-2 w-5 h-5 text-yellow-400" />
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <motion.button
                    onClick={() => router.push("/text-to-speech")}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl w-full text-white text-left transition-all"
                  >
                    <MicrophoneIcon className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium">Text-to-Speech</div>
                      <div className="text-gray-300 text-xs">
                        Convert text to audio
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/document-processing")}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl w-full text-white text-left transition-all"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium">Document AI</div>
                      <div className="text-gray-300 text-xs">
                        Process documents
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/analytics")}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl w-full text-white text-left transition-all"
                  >
                    <ChartBarIcon className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Analytics</div>
                      <div className="text-gray-300 text-xs">
                        Usage insights
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/api-playground")}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl w-full text-white text-left transition-all"
                  >
                    <GlobeAltIcon className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="font-medium">API Playground</div>
                      <div className="text-gray-300 text-xs">
                        Test API endpoints
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="flex flex-col bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl h-[700px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="flex items-center font-semibold text-white text-xl">
                    <CpuChipIcon className="mr-2 w-6 h-6 text-blue-400" />
                    AI Assistant
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse"></div>
                    <span>Connected</span>
                  </div>
                </div>
                <div className="flex-1">
                  <ChatInterface />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthHydration>
  );
}
