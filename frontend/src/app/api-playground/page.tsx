"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
import {
  GlobeAltIcon,
  ArrowLeftIcon,
  PlayIcon,
  CodeBracketIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const API_ENDPOINTS = [
  {
    name: "Chat Completion",
    method: "POST",
    endpoint: "/api/chat",
    description: "Send a message to AI and get a response",
    sampleRequest: {
      message: "Hello, how can you help me today?",
      stream: false,
    },
  },
  {
    name: "Text-to-Speech",
    method: "POST",
    endpoint: "/api/text-to-speech",
    description: "Convert text to speech audio",
    sampleRequest: {
      text: "Hello, this is a test of the text-to-speech feature.",
      voice: "alloy",
    },
  },
  {
    name: "Document Processing",
    method: "POST",
    endpoint: "/api/document/process",
    description: "Process and analyze uploaded documents",
    sampleRequest: {
      file: "[File Upload Required]",
    },
  },
  {
    name: "User Profile",
    method: "GET",
    endpoint: "/api/user/profile",
    description: "Get current user profile information",
    sampleRequest: {},
  },
];

export default function APIPlaygroundPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(API_ENDPOINTS[0].sampleRequest, null, 2)
  );
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isHydrated || !isAuthenticated) {
    return (
      <AuthHydration>
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen" />
      </AuthHydration>
    );
  }

  const handleEndpointChange = (endpoint: (typeof API_ENDPOINTS)[0]) => {
    setSelectedEndpoint(endpoint);
    setRequestBody(JSON.stringify(endpoint.sampleRequest, null, 2));
    setResponse("");
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      let requestOptions: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (selectedEndpoint.method !== "GET") {
        requestOptions.headers = {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        };
        requestOptions.body = requestBody;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}${
          selectedEndpoint.endpoint
        }`,
        requestOptions
      );

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      setResponse(
        JSON.stringify(
          {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: responseData,
          },
          null,
          2
        )
      );
    } catch (error) {
      setResponse(
        JSON.stringify(
          {
            error: "Request failed",
            message: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCurlCommand = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    const token = localStorage.getItem("token");

    let curlCommand = `curl -X ${selectedEndpoint.method} "${baseUrl}${selectedEndpoint.endpoint}"`;
    curlCommand += ` \\\n  -H "Authorization: Bearer ${token}"`;

    if (selectedEndpoint.method !== "GET") {
      curlCommand += ` \\\n  -H "Content-Type: application/json"`;
      curlCommand += ` \\\n  -d '${requestBody}'`;
    }

    return curlCommand;
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
            <div className="flex items-center h-16">
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
                <GlobeAltIcon className="mr-3 w-8 h-8 text-orange-400" />
                API Playground
              </motion.h1>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Endpoint Selector */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <h2 className="flex items-center mb-6 font-semibold text-white text-xl">
                  <CodeBracketIcon className="mr-2 w-6 h-6 text-purple-400" />
                  API Endpoints
                </h2>

                <div className="space-y-3">
                  {API_ENDPOINTS.map((endpoint) => (
                    <motion.button
                      key={endpoint.endpoint}
                      onClick={() => handleEndpointChange(endpoint)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedEndpoint.endpoint === endpoint.endpoint
                          ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/50"
                          : "bg-white/5 hover:bg-white/10 border border-white/20"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            endpoint.method === "GET"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          } text-white`}
                        >
                          {endpoint.method}
                        </span>
                        <span className="font-medium text-white">
                          {endpoint.name}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {endpoint.description}
                      </p>
                      <p className="mt-1 font-mono text-purple-300 text-xs">
                        {endpoint.endpoint}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* API Key Info */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 mt-6 p-4 border border-orange-500/30 rounded-xl">
                  <h4 className="mb-2 font-semibold text-white text-sm">
                    Authentication
                  </h4>
                  <p className="text-gray-300 text-xs">
                    All requests require a Bearer token in the Authorization
                    header. Your current session token is automatically
                    included.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Request/Response Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 lg:col-span-2"
            >
              {/* Request Section */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center font-semibold text-white text-lg">
                    <PlayIcon className="mr-2 w-5 h-5 text-green-400" />
                    Request
                  </h3>
                  <motion.button
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      isLoading
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    }`}
                  >
                    {isLoading ? "Sending..." : "Send Request"}
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-300 text-sm">
                      {selectedEndpoint.method} {selectedEndpoint.endpoint}
                    </label>
                    {selectedEndpoint.method !== "GET" && (
                      <textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        rows={8}
                        className="bg-gray-900/50 px-4 py-3 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full font-mono text-white text-sm"
                        placeholder="Request body (JSON)"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Response Section */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white text-lg">Response</h3>
                  {response && (
                    <motion.button
                      onClick={() => copyToClipboard(response)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {copied ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {copied ? "Copied!" : "Copy"}
                      </span>
                    </motion.button>
                  )}
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl min-h-[300px] max-h-[400px] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="border-purple-400 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                    </div>
                  ) : (
                    <pre className="font-mono text-white text-sm whitespace-pre-wrap">
                      {response ||
                        "Response will appear here after sending a request..."}
                    </pre>
                  )}
                </div>
              </div>

              {/* cURL Command */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white text-lg">
                    cURL Command
                  </h3>
                  <motion.button
                    onClick={() => copyToClipboard(generateCurlCommand())}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </motion.button>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl">
                  <pre className="font-mono text-green-400 text-sm whitespace-pre-wrap">
                    {generateCurlCommand()}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthHydration>
  );
}
