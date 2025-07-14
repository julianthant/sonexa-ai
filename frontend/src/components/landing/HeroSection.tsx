import { ArrowRight, Play, Check, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Gradient Overlays */}
      <div className="top-0 left-1/4 absolute bg-blue-500/10 blur-3xl rounded-full w-96 h-96"></div>
      <div className="right-1/4 bottom-0 absolute bg-purple-500/10 blur-3xl rounded-full w-96 h-96"></div>

      <div className="relative mx-auto py-20 max-w-[1400px]">
        {/* Main Content */}
        <div className="items-center gap-16 grid lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 border border-blue-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-blue-300 text-sm">
                AI-Powered Voice Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight">
                <div className="text-white whitespace-nowrap">
                  Transform Voice Into
                </div>
                <div className="bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 h-20 text-transparent whitespace-nowrap">
                  Intelligent Insights
                </div>
              </h1>

              <p className="max-w-2xl text-slate-300 text-xl lg:text-2xl leading-relaxed">
                Convert voice messages into actionable intelligence with
                enterprise-grade AI. From Azure Speech Services to OpenAI -
                unlock the full potential of your voice data.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="gap-4 grid grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-green-500/20 rounded-full w-8 h-8">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <span className="font-medium text-slate-300">
                  99.9% Accuracy
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-8 h-8">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <span className="font-medium text-slate-300">
                  Real-time Processing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-purple-500/20 rounded-full w-8 h-8">
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <span className="font-medium text-slate-300">
                  100+ Languages
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-orange-500/20 rounded-full w-8 h-8">
                  <Check className="w-4 h-4 text-orange-400" />
                </div>
                <span className="font-medium text-slate-300">
                  SOC2 Compliant
                </span>
              </div>
            </div>

            {/* CTA Buttons - New Modern Design */}
            <div className="flex sm:flex-row flex-col gap-4 pt-4">
              <Link href="/auth/register">
                <Button
                  size="default"
                  className="bg-slate-900 hover:bg-slate-800 px-6 py-2.5 border border-slate-700 hover:border-slate-600 rounded-lg font-medium text-white text-sm transition-colors duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="default"
                className="bg-transparent hover:bg-slate-50 px-6 py-2.5 border border-slate-300 hover:border-slate-400 rounded-lg font-medium text-white hover:text-slate-900 text-sm transition-colors duration-200"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-slate-700 border-t">
              <p className="mb-4 text-slate-400 text-sm">
                Trusted by 10,000+ companies worldwide
              </p>
              <div className="flex items-center gap-8 opacity-60">
                <span className="font-medium text-slate-400">
                  Microsoft Azure
                </span>
                <span className="font-medium text-slate-400">OpenAI</span>
                <span className="font-medium text-slate-400">
                  Enterprise Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Container */}
            <div className="relative bg-slate-800/30 backdrop-blur-sm p-8 border border-slate-700 rounded-3xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

              {/* Dashboard Mockup */}
              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-slate-600 border-b">
                  <h3 className="font-semibold text-white text-lg">
                    Voice Analytics Dashboard
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 rounded-full w-2 h-2"></div>
                    <span className="mr-32 text-slate-400 text-sm">Live</span>
                  </div>
                </div>

                {/* Analytics Cards */}
                <div className="gap-4 grid grid-cols-2">
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="font-bold text-white text-2xl">1,247</div>
                    <div className="text-slate-400 text-sm">
                      Messages Processed
                    </div>
                    <div className="mt-1 text-green-400 text-xs">
                      +12% this week
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="font-bold text-white text-2xl">96.8%</div>
                    <div className="text-slate-400 text-sm">Accuracy Rate</div>
                    <div className="mt-1 text-green-400 text-xs">
                      +2.1% improved
                    </div>
                  </div>
                </div>

                {/* Voice Waveform */}
                <div className="bg-slate-700/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-500 rounded-full w-3 h-3 animate-pulse"></div>
                    <span className="text-slate-300 text-sm">
                      Processing audio...
                    </span>
                  </div>

                  {/* Animated Bars */}
                  <div className="flex justify-center items-end gap-1 h-16">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-pulse"
                        style={{
                          width: "4px",
                          height: `${Math.random() * 50 + 10}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "1.5s",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="space-y-3">
                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500 rounded-full w-2 h-2"></div>
                      <span className="font-medium text-blue-300 text-sm">
                        AI Insight
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      "Customer expressing urgency about timeline - recommend
                      priority follow-up"
                    </p>
                  </div>

                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      <span className="font-medium text-green-300 text-sm">
                        Action Item
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      "Schedule demo for next Tuesday at 2 PM"
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="top-7 right-8 absolute bg-blue-500/20 backdrop-blur-sm px-3 py-1 border border-blue-500/30 rounded-lg">
                <span className="font-medium text-blue-300 text-xs">
                  Azure + OpenAI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
