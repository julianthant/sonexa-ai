"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
import {
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ArrowLeftIcon,
  EyeIcon,
  CpuChipIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function DocumentProcessingPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isHydrated || !isAuthenticated) {
    return (
      <AuthHydration>
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen" />
      </AuthHydration>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setExtractedText("");
      setAnalysis("");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setExtractedText("");
      setAnalysis("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
        }/document/process`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setExtractedText(result.extractedText || "");
        setAnalysis(result.analysis || "");
      } else {
        throw new Error("Failed to process document");
      }
    } catch (error) {
      console.error("Error processing document:", error);
      alert("Failed to process document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
                <DocumentTextIcon className="mr-3 w-8 h-8 text-blue-400" />
                Document Processing
              </motion.h1>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Upload Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg p-8 border border-white/20 rounded-2xl"
            >
              <h2 className="flex items-center mb-6 font-semibold text-white text-xl">
                <ArrowUpTrayIcon className="mr-2 w-6 h-6 text-purple-400" />
                Upload Document
              </h2>

              {/* File Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="p-8 border-2 border-white/30 hover:border-purple-400 border-dashed rounded-xl text-center transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <ArrowUpTrayIcon className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                <p className="mb-2 text-white">
                  {selectedFile
                    ? selectedFile.name
                    : "Drop your document here or click to browse"}
                </p>
                <p className="text-gray-300 text-sm">
                  Supports PDF, DOCX, TXT, and image files
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 mt-6 p-4 border border-white/20 rounded-xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">
                          {selectedFile.name}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Process Button */}
              <motion.button
                onClick={handleProcess}
                disabled={!selectedFile || isProcessing}
                whileHover={{ scale: selectedFile && !isProcessing ? 1.02 : 1 }}
                whileTap={{ scale: selectedFile && !isProcessing ? 0.98 : 1 }}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                  selectedFile && !isProcessing
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="border-white border-b-2 rounded-full w-6 h-6 animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CpuChipIcon className="w-6 h-6" />
                    <span>Process Document</span>
                  </>
                )}
              </motion.button>

              {/* Feature Info */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 mt-8 p-4 border border-purple-500/30 rounded-xl">
                <h4 className="flex items-center mb-2 font-semibold text-white text-sm">
                  <CpuChipIcon className="mr-2 w-4 h-4 text-purple-400" />
                  AI Capabilities
                </h4>
                <ul className="space-y-1 text-gray-300 text-xs">
                  <li>• Text extraction from PDFs and images</li>
                  <li>• Document summarization</li>
                  <li>• Key information extraction</li>
                  <li>• Content analysis and insights</li>
                </ul>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Extracted Text */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center font-semibold text-white text-lg">
                    <EyeIcon className="mr-2 w-5 h-5 text-green-400" />
                    Extracted Text
                  </h3>
                  {extractedText && (
                    <button
                      onClick={() => copyToClipboard(extractedText)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="bg-white/5 p-4 rounded-xl min-h-[200px] max-h-[300px] overflow-y-auto">
                  {extractedText ? (
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {extractedText}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      Extracted text will appear here after processing...
                    </p>
                  )}
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center font-semibold text-white text-lg">
                    <CpuChipIcon className="mr-2 w-5 h-5 text-purple-400" />
                    AI Analysis
                  </h3>
                  {analysis && (
                    <button
                      onClick={() => copyToClipboard(analysis)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="bg-white/5 p-4 rounded-xl min-h-[200px] max-h-[300px] overflow-y-auto">
                  {analysis ? (
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {analysis}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      AI analysis and insights will appear here after
                      processing...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthHydration>
  );
}
