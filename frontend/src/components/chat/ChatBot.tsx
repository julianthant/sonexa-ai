"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Sonexa AI assistant. I can help you with questions about your voice messages, analytics, billing, or any other features. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    const botResponse = {
      id: messages.length + 2,
      text: generateBotResponse(message),
      isBot: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botResponse]);
    setMessage("");
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("voice message") ||
      lowerMessage.includes("voicemail")
    ) {
      return "I can help you with voice message management! You can view all your voice messages in the Archive section, where they're organized by status (Accepted, Rejected, Quarantined). Would you like to know about a specific type of message?";
    }

    if (lowerMessage.includes("analytics") || lowerMessage.includes("report")) {
      return "Our analytics dashboard shows comprehensive insights including message volume, sentiment analysis, geographic distribution, and performance metrics. You can access detailed reports by navigating to the Analytics section. What specific metrics are you interested in?";
    }

    if (
      lowerMessage.includes("billing") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("cost")
    ) {
      return "For billing information, you can check your current usage, view invoices, and manage your subscription in the Billing section. We offer flexible pricing plans based on your message volume. Need help with a specific billing question?";
    }

    if (
      lowerMessage.includes("settings") ||
      lowerMessage.includes("configuration")
    ) {
      return "In Settings, you can configure your voice message processing preferences, notification settings, and view your unique Voice Message ID for integrations. What would you like to configure?";
    }

    return "I'm here to help! I have access to all information about your voice messages, analytics, billing, and system features. Feel free to ask me anything specific about using Sonexa AI.";
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="right-6 bottom-6 z-50 fixed"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full w-14 h-14"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              height: isMinimized ? "60px" : "500px",
            }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            className="right-6 bottom-6 z-50 fixed w-80"
          >
            <Card className="bg-white shadow-xl border border-gray-200">
              <CardHeader className="bg-blue-600 p-4 rounded-t-lg text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="font-semibold text-lg">
                    Sonexa AI Assistant
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="hover:bg-blue-700 p-1 w-8 h-8 text-white"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-blue-700 p-1 w-8 h-8 text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="space-y-4 p-4 h-80 overflow-y-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.isBot
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="opacity-70 mt-1 text-xs">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-gray-200 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <Button
                        onClick={handleSendMessage}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
