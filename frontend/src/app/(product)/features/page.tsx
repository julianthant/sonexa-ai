import { Metadata } from "next";
import {
  Brain,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Users,
  Upload,
  Download,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Clock,
  Target,
  Headphones,
  MessageSquare,
  TrendingUp,
  Lock,
  Smartphone,
  Cloud,
  Mic,
  FileAudio,
  Settings,
  Layers,
  Network,
  Database,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features - Sonexa AI Voice Intelligence Platform",
  description:
    "Discover powerful AI features for voice analysis, transcription, sentiment analysis, and more. Transform your voice data into actionable insights.",
};

const coreFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Transcription",
    description:
      "Industry-leading speech-to-text with 99.8% accuracy across 120+ languages and dialects",
    features: [
      "Real-time transcription",
      "Multi-language support",
      "Custom vocabulary",
      "Speaker diarization",
    ],
    badge: "Most Popular",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights from voice data with sentiment analysis, emotion detection, and trend analysis",
    features: [
      "Sentiment scoring",
      "Emotion detection",
      "Keyword tracking",
      "Performance metrics",
    ],
    badge: "Enterprise",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with SOC2 compliance, end-to-end encryption, and data sovereignty",
    features: [
      "End-to-end encryption",
      "SOC2 Type II certified",
      "GDPR compliant",
      "Zero-trust architecture",
    ],
    badge: "Secure",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description:
      "Process voice messages instantly with sub-second latency and real-time insights",
    features: [
      "Sub-second latency",
      "Live streaming support",
      "Instant notifications",
      "Real-time dashboards",
    ],
    badge: "Fast",
  },
];

const advancedFeatures = [
  {
    icon: Users,
    title: "Speaker Intelligence",
    description:
      "Identify and analyze individual speakers with voice biometrics and behavioral patterns",
  },
  {
    icon: Target,
    title: "Custom Models",
    description:
      "Train custom AI models on your specific domain and terminology for maximum accuracy",
  },
  {
    icon: Network,
    title: "API Integration",
    description:
      "Seamlessly integrate with 500+ tools via our comprehensive REST API and webhooks",
  },
  {
    icon: Cloud,
    title: "Scalable Infrastructure",
    description:
      "Auto-scaling cloud infrastructure that grows with your business needs",
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Centralized data lake with advanced search, filtering, and export capabilities",
  },
  {
    icon: Settings,
    title: "Workflow Automation",
    description:
      "Automate complex workflows with triggers, actions, and intelligent routing",
  },
];

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "Microsoft Teams", category: "Communication" },
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Zoom", category: "Video" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "Zapier", category: "Automation" },
  { name: "AWS", category: "Cloud" },
];

const useCases = [
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Analyze support calls for quality assurance, training insights, and customer satisfaction",
    metrics: [
      "95% faster QA reviews",
      "40% improvement in CSAT",
      "60% reduction in training time",
    ],
  },
  {
    icon: MessageSquare,
    title: "Sales Intelligence",
    description:
      "Extract insights from sales calls to improve conversion rates and identify opportunities",
    metrics: [
      "32% increase in close rates",
      "50% better lead qualification",
      "25% shorter sales cycles",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    description:
      "Analyze voice feedback, interviews, and focus groups for market intelligence",
    metrics: [
      "80% faster analysis",
      "3x more insights discovered",
      "90% cost reduction",
    ],
  },
  {
    icon: Lock,
    title: "Compliance Monitoring",
    description:
      "Ensure regulatory compliance with automated monitoring and reporting",
    metrics: ["100% audit coverage", "99% compliance rate", "75% reduced risk"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Back to Home Button */}
      <div className="top-4 left-4 z-20 absolute">
        <Link
          href="/"
          className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20 rounded-full text-white hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-8 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="top-1/4 left-1/4 absolute bg-blue-500/20 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
          <div className="right-1/4 bottom-1/4 absolute bg-purple-500/20 blur-3xl rounded-full w-80 h-80"></div>
        </div>

        <div className="z-10 relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-6 py-3 border border-white/20 rounded-full">
            <Sparkles className="mr-2 w-5 h-5 text-yellow-400" />
            <span className="font-medium text-white">Powerful AI Features</span>
          </div>

          <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl leading-tight">
            Transform Voice Data Into
            <span className="block bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent">
              Actionable Intelligence
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-blue-100 text-xl md:text-2xl leading-relaxed">
            Unlock the power of AI-driven voice analysis with features designed
            for modern businesses. From real-time transcription to advanced
            sentiment analysis.
          </p>

          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <a
              href="/auth/register"
              className="inline-flex items-center bg-slate-900 hover:bg-slate-800 px-6 py-2.5 border border-slate-700 hover:border-slate-600 rounded-lg font-medium text-white text-sm transition-colors duration-200"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center bg-transparent hover:bg-white/10 px-6 py-2.5 border border-white/30 hover:border-white/50 rounded-lg font-medium text-white text-sm transition-colors duration-200"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Core Features
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              Everything you need to extract insights from voice data
            </p>
          </div>

          <div className="gap-8 grid lg:grid-cols-2">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-300"
              >
                {feature.badge && (
                  <div className="top-6 right-6 absolute bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 rounded-full font-medium text-white text-sm">
                    {feature.badge}
                  </div>
                )}

                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-4 font-bold text-white text-2xl">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-slate-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-slate-300"
                        >
                          <CheckCircle className="mr-3 w-5 h-5 text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-slate-800/50 px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Advanced Capabilities
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              Enterprise-grade features for complex voice intelligence needs
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <feature.icon className="mb-6 w-12 h-12 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                <h3 className="mb-4 font-bold text-white text-xl">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Real-World Use Cases
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              See how businesses use Sonexa AI to drive results
            </p>
          </div>

          <div className="gap-8 grid lg:grid-cols-2">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-3xl"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl">
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="mb-4 font-bold text-white text-2xl">
                      {useCase.title}
                    </h3>
                    <p className="mb-6 text-slate-300 text-lg leading-relaxed">
                      {useCase.description}
                    </p>

                    <div className="gap-4 grid md:grid-cols-3">
                      {useCase.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center"
                        >
                          <div className="font-bold text-cyan-400">
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gray-50 px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-gray-900 text-3xl md:text-4xl">
              Seamless Integrations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-xl">
              Connect with the tools you already use and love
            </p>
          </div>

          <div className="gap-6 grid md:grid-cols-4 lg:grid-cols-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="group bg-white shadow-md hover:shadow-lg p-4 rounded-xl text-center transition-all duration-300"
              >
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 rounded-lg w-12 h-12">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div className="mb-1 font-medium text-gray-900 text-sm">
                  {integration.name}
                </div>
                <div className="text-gray-500 text-xs">
                  {integration.category}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/integrations"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View all 100+ integrations
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
            Ready to Experience These Features?
          </h2>
          <p className="mb-8 text-blue-100 text-xl leading-relaxed">
            Start your free trial today and discover how Sonexa AI can transform
            your voice data into actionable insights.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <a
              href="/auth/register"
              className="inline-flex justify-center items-center bg-slate-900 hover:bg-slate-800 px-6 py-2.5 border border-slate-700 hover:border-slate-600 rounded-lg font-medium text-white text-sm transition-colors duration-200"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="inline-flex justify-center items-center bg-transparent hover:bg-white/10 px-6 py-2.5 border border-white/30 hover:border-white/50 rounded-lg font-medium text-white text-sm transition-colors duration-200"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
