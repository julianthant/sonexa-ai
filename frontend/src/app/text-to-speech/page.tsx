"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { AuthHydration } from "@/components/auth/AuthHydration";
import {
  MicrophoneIcon,
  PlayIcon,
  StopIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  SpeakerWaveIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function TextToSpeechPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [text, setText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!isHydrated || !isAuthenticated) {
    return (
      <AuthHydration>
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen" />
      </AuthHydration>
    );
  }

  const handleConvert = async () => {
    if (!text.trim()) return;

    setIsConverting(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
        }/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        throw new Error("Failed to convert text to speech");
      }
    } catch (error) {
      console.error("Error converting text to speech:", error);
      alert("Failed to convert text to speech. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "speech.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
                <SpeakerWaveIcon className="mr-3 w-8 h-8 text-purple-400" />
                Text-to-Speech
              </motion.h1>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg p-8 border border-white/20 rounded-2xl"
          >
            {/* Input Section */}
            <div className="mb-8">
              <label className="flex items-center mb-4 font-medium text-white text-lg">
                <MicrophoneIcon className="mr-2 w-6 h-6 text-green-400" />
                Enter Text to Convert
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                rows={8}
                className="bg-white/10 px-4 py-3 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white resize-none placeholder-gray-300"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-300 text-sm">
                  {text.length}/5000 characters
                </span>
                <div className="flex items-center text-gray-300 text-sm">
                  <CpuChipIcon className="mr-1 w-4 h-4 text-blue-400" />
                  {user?.subscription_tier === "free"
                    ? "Azure Speech"
                    : "Premium Voice"}
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <div className="mb-8">
              <motion.button
                onClick={handleConvert}
                disabled={!text.trim() || isConverting}
                whileHover={{ scale: text.trim() && !isConverting ? 1.02 : 1 }}
                whileTap={{ scale: text.trim() && !isConverting ? 0.98 : 1 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                  text.trim() && !isConverting
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {isConverting ? (
                  <>
                    <div className="border-white border-b-2 rounded-full w-6 h-6 animate-spin"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <SpeakerWaveIcon className="w-6 h-6" />
                    <span>Convert to Speech</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 p-6 border border-white/20 rounded-xl"
              >
                <h3 className="flex items-center mb-4 font-semibold text-white text-lg">
                  <PlayIcon className="mr-2 w-5 h-5 text-green-400" />
                  Generated Audio
                </h3>

                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />

                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handlePlay}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <StopIcon className="w-5 h-5" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-5 h-5" />
                        <span>Play</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    <span>Download</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Feature Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 mt-8 p-6 border border-purple-500/30 rounded-xl"
            >
              <h4 className="flex items-center mb-3 font-semibold text-white text-lg">
                <CpuChipIcon className="mr-2 w-5 h-5 text-purple-400" />
                Voice Features
              </h4>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-gray-300 text-sm">
                <div>
                  <span className="font-medium text-white">Free Tier:</span>
                  <ul className="space-y-1 mt-1">
                    <li>• Azure Speech Service</li>
                    <li>• Standard voice quality</li>
                    <li>• 5,000 characters/month</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-white">Premium Tiers:</span>
                  <ul className="space-y-1 mt-1">
                    <li>• OpenAI TTS Models</li>
                    <li>• High-quality neural voices</li>
                    <li>• Unlimited usage</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </AuthHydration>
  );
}
