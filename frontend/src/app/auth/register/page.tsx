import {
  MessageSquare,
  Rocket,
  Users,
  Globe,
  TrendingUp,
  Star,
} from "lucide-react";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterFormClient";

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-2 bg-slate-900 min-h-screen">
      {/* Left Column - Modern Branding */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 overflow-hidden text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="top-0 right-0 absolute bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent)] w-full h-full animate-pulse"></div>
          <div className="bottom-0 left-0 absolute bg-white/5 blur-3xl rounded-full w-96 h-96"></div>
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
              <h2 className="mb-6 font-bold text-4xl leading-tight">
                Transform Your Business with AI-Powered Voice Intelligence
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed">
                Join thousands of companies already using Sonexa AI to unlock
                valuable insights from voice data.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="gap-4 grid grid-cols-2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                <Rocket className="mx-auto mb-2 w-8 h-8 text-yellow-300" />
                <h4 className="font-semibold">Quick Setup</h4>
                <p className="text-blue-100 text-sm">Ready in minutes</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                <Users className="mx-auto mb-2 w-8 h-8 text-green-300" />
                <h4 className="font-semibold">Team Ready</h4>
                <p className="text-blue-100 text-sm">Collaborate easily</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                <Globe className="mx-auto mb-2 w-8 h-8 text-blue-300" />
                <h4 className="font-semibold">Global Scale</h4>
                <p className="text-blue-100 text-sm">100+ languages</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                <TrendingUp className="mx-auto mb-2 w-8 h-8 text-purple-300" />
                <h4 className="font-semibold">AI Insights</h4>
                <p className="text-blue-100 text-sm">Smart analytics</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex justify-center items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-current w-4 h-4 text-yellow-300"
                  />
                ))}
                <span className="ml-2 font-medium text-sm">4.9/5</span>
              </div>
              <p className="mb-3 text-blue-100 text-sm">
                "The AI insights have revolutionized our customer service
                approach."
              </p>
              <div className="flex justify-center items-center space-x-2">
                <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-full w-8 h-8"></div>
                <div className="text-left">
                  <p className="font-medium text-white text-sm">Sarah Chen</p>
                  <p className="text-blue-200 text-xs">
                    VP Operations, TechCorp
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <div className="text-center">
                <div className="font-medium text-sm">SOC2</div>
                <div className="text-blue-200 text-xs">Compliant</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">GDPR</div>
                <div className="text-blue-200 text-xs">Ready</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">99.9%</div>
                <div className="text-blue-200 text-xs">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Clean Register Form */}
      <div className="relative flex flex-col justify-center items-center bg-slate-900 p-12">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20"></div>

        <div className="z-10 relative space-y-8 w-full max-w-md">
          {/* Form Container */}
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 border border-slate-700 rounded-2xl">
            <RegisterForm />
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
                Help & Support
              </Link>
            </div>

            <p className="mx-auto max-w-sm text-slate-500 text-xs leading-relaxed">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
