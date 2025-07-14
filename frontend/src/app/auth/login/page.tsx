import { MessageSquare, Sparkles, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginFormClient";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 bg-slate-900 min-h-screen">
      {/* Left Column - Modern Branding */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 overflow-hidden text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="top-0 left-0 absolute bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)] w-full h-full animate-pulse"></div>
          <div className="right-0 bottom-0 absolute bg-white/5 blur-3xl rounded-full w-96 h-96"></div>
        </div>

        <div className="z-10 relative space-y-12 max-w-lg text-center">
          {/* Logo */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <div className="flex justify-center items-center bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl">Sonexa AI</h1>
              <p className="text-blue-100 text-sm">
                Voice Intelligence Platform
              </p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-bold text-4xl leading-tight">
                Welcome Back to the Future of Voice AI
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed">
                Continue your journey in transforming voice data into
                intelligent business insights.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="gap-6 grid">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex flex-shrink-0 justify-center items-center bg-white/20 rounded-xl w-12 h-12">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    AI-Powered Transcription
                  </h4>
                  <p className="text-blue-100 text-sm">
                    99.9% accuracy with advanced ML models
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex flex-shrink-0 justify-center items-center bg-white/20 rounded-xl w-12 h-12">
                  <Shield className="w-6 h-6 text-green-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Enterprise Security</h4>
                  <p className="text-blue-100 text-sm">
                    SOC2 compliant with end-to-end encryption
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex flex-shrink-0 justify-center items-center bg-white/20 rounded-xl w-12 h-12">
                  <Zap className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Real-time Processing
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Lightning-fast analysis and insights
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex justify-center items-center space-x-2 mb-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white rounded-full w-8 h-8"
                    />
                  ))}
                </div>
                <span className="font-medium text-sm">10,000+ users</span>
              </div>
              <p className="text-blue-100 text-sm">
                "Sonexa AI has transformed how we handle voice data. Incredible
                insights!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Clean Login Form */}
      <div className="relative flex flex-col justify-center items-center bg-slate-900 p-12">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20"></div>

        <div className="z-10 relative space-y-8 w-full max-w-md">
          {/* Form Container */}
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 border border-slate-700 rounded-2xl">
            <LoginForm />
          </div>

          {/* Footer Links */}
          <div className="space-y-4 text-center">
            <div className="flex justify-center items-center space-x-6 text-sm">
              <Link
                href="/"
                className="text-slate-500 hover:text-slate-400 transition-colors"
              >
                ← Back to home
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/help-center"
                className="text-slate-500 hover:text-slate-400 transition-colors"
              >
                Need help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
