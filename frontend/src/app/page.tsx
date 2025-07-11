"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CpuChipIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: BoltIcon,
      title: "Smart Tier Routing",
      description:
        "Automatically routes your requests to Azure AI (free tier) or OpenAI (paid tiers) based on your subscription.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Reliable",
      description:
        "Built with Spring Boot security, JWT authentication, and enterprise-grade infrastructure.",
    },
    {
      icon: ChartBarIcon,
      title: "Flexible Pricing",
      description:
        "Start free with Azure AI, upgrade to unlock OpenAI's advanced capabilities as you grow.",
    },
    {
      icon: SparklesIcon,
      title: "Advanced AI Models",
      description:
        "Access to the latest AI models from both Azure OpenAI and OpenAI, including GPT-4 and more.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Hero Section - Full Screen */}
      <div className="relative flex justify-center items-center h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="-top-40 -right-32 absolute bg-blue-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob mix-blend-multiply filter"></div>
          <div className="-bottom-40 -left-32 absolute bg-purple-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
          <div className="top-40 left-40 absolute bg-indigo-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
        </div>

        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl mb-8 rounded-2xl w-20 h-20">
                <CpuChipIcon className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              className="mb-6 font-bold text-gray-900 text-5xl md:text-7xl leading-tight"
            >
              Intelligent
              <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent">
                {" "}
                AI
              </span>
              <br />
              Processing
            </motion.h1>

            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mb-12 max-w-3xl text-gray-600 text-xl md:text-2xl leading-relaxed"
            >
              Experience the power of tier-based AI processing with Sonexa AI.
              From Azure AI for exploration to OpenAI for advanced tasks.
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex sm:flex-row flex-col justify-center gap-4"
            >
              <Button
                onClick={() => router.push("/auth/register")}
                size="xl"
                className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-xl hover:shadow-2xl text-white hover:scale-105 transition-all duration-200 transform"
              >
                Get Started Free
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
                size="xl"
                className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                Sign In
              </Button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/60 shadow-lg hover:shadow-xl backdrop-blur-sm p-6 border border-white/20 rounded-2xl transition-all duration-300"
                >
                  <div className="inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-xl w-12 h-12">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="mb-4 text-gray-500 text-sm">
                Trusted by developers worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span className="text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BoltIcon className="w-5 h-5" />
                  <span className="text-sm">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm">Latest AI Models</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
