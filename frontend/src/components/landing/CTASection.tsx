import { ArrowRight, MessageCircle, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="top-0 left-1/4 absolute bg-white/10 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
        <div className="right-1/4 bottom-0 absolute bg-white/5 blur-3xl rounded-full w-80 h-80"></div>
      </div>

      <div className="z-10 relative mx-auto max-w-[1400px] text-center">
        <div className="space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 border border-white/30 rounded-full">
            <Sparkles className="mr-2 w-5 h-5 text-yellow-300" />
            <span className="font-medium text-white">
              Start Your AI Journey Today
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <h2 className="font-bold text-white text-4xl md:text-6xl leading-tight">
              Ready to Transform Your
              <span className="block">Voice Data into Gold?</span>
            </h2>

            <p className="mx-auto max-w-3xl text-blue-100 text-xl md:text-2xl leading-relaxed">
              Join thousands of teams already using Sonexa AI to unlock insights
              from voice messages. Start your free trial and see the power of
              AI-driven voice intelligence.
            </p>
          </div>

          {/* Features Grid */}
          <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
              <Zap className="mx-auto mb-4 w-12 h-12 text-yellow-300" />
              <h3 className="mb-2 font-semibold text-white text-lg">
                Instant Setup
              </h3>
              <p className="text-blue-100 text-sm">
                Get started in under 5 minutes
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
              <Shield className="mx-auto mb-4 w-12 h-12 text-green-300" />
              <h3 className="mb-2 font-semibold text-white text-lg">
                Enterprise Security
              </h3>
              <p className="text-blue-100 text-sm">
                SOC2 compliant with 99.9% uptime
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
              <Sparkles className="mx-auto mb-4 w-12 h-12 text-purple-300" />
              <h3 className="mb-2 font-semibold text-white text-lg">
                AI-Powered
              </h3>
              <p className="text-blue-100 text-sm">
                Advanced insights with every message
              </p>
            </div>
          </div>

          {/* CTA Buttons - New Modern Design */}
          <div className="flex sm:flex-row flex-col justify-center gap-4 pt-8">
            {/* Start Free Trial Button */}
            <Link href="/auth/register">
              <Button
                size="default"
                className="bg-slate-900 hover:bg-slate-800 px-6 py-2.5 border border-slate-700 hover:border-slate-600 rounded-lg font-medium text-white text-sm transition-colors duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            {/* Contact Sales Button */}
            <Link href="/contact">
              <Button
                variant="outline"
                size="default"
                className="bg-transparent hover:bg-slate-50 px-6 py-2.5 border border-slate-300 hover:border-slate-400 rounded-lg font-medium text-white hover:text-slate-900 text-sm transition-colors duration-200"
              >
                Contact Sales
                <MessageCircle className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-white/20 border-t">
            <p className="mb-6 text-blue-200 text-sm">
              Trusted by 10,000+ companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="font-semibold text-white">Microsoft Azure</div>
              <div className="font-semibold text-white">OpenAI</div>
              <div className="font-semibold text-white">Stripe</div>
              <div className="font-semibold text-white">Resend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
