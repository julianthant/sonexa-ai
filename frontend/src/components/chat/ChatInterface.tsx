"use client";

import { useState, useRef } from "react";
import {
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth";
import { apiService } from "@/lib/api";
import type { ChatMessage } from "@/types/ai";
import toast from "react-hot-toast";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const subscriptionTier = user?.subscription_tier || "free";
      const response = await apiService.chatWithAI(
        inputMessage,
        subscriptionTier
      );

      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.data.response,
          role: "assistant",
          timestamp: new Date(),
          tier_used: response.data.tier_used,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        toast.error(response.error?.message || "Failed to get AI response");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTierBadgeColor = (tier?: string) => {
    switch (tier) {
      case "openai":
        return "bg-green-100 text-green-800";
      case "azure":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-sm border rounded-lg h-full">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b rounded-t-lg">
        <h2 className="flex items-center font-semibold text-gray-900 text-lg">
          <CpuChipIcon className="mr-2 w-5 h-5" />
          AI Chat Assistant
        </h2>
        <p className="mt-1 text-gray-600 text-sm">
          Powered by{" "}
          {user?.subscription_tier === "free" ? "Azure AI" : "OpenAI"} • Current
          plan:{" "}
          <span className="font-medium capitalize">
            {user?.subscription_tier || "free"}
          </span>
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 p-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="mt-8 text-gray-500 text-center">
            <CpuChipIcon className="mx-auto mb-4 w-12 h-12 text-gray-300" />
            <p className="font-medium text-lg">Start a conversation</p>
            <p className="mt-2 text-sm">
              Ask me anything, and I'll help you with intelligent AI responses.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  {message.role === "user" ? (
                    <UserIcon className="mt-0.5 w-4 h-4" />
                  ) : (
                    <CpuChipIcon className="mt-0.5 w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  {message.tier_used && (
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${getTierBadgeColor(
                        message.tier_used
                      )}`}
                    >
                      {message.tier_used === "openai" ? "OpenAI" : "Azure AI"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-xs lg:max-w-md text-gray-900">
              <div className="flex items-center space-x-2">
                <CpuChipIcon className="w-4 h-4 animate-pulse" />
                <div className="flex space-x-1">
                  <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"></div>
                  <div
                    className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-50 p-4 border-t rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="disabled:opacity-50 px-4 py-2 disabled:cursor-not-allowed btn-primary"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
