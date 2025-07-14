import { Metadata } from "next";
import {
  Zap,
  Brain,
  Shield,
  BarChart3,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Headphones,
  MessageSquare,
  Target,
  Cloud,
  Settings,
  Database,
  Network,
  Lock,
  TrendingUp,
  Mic,
  Phone,
  Video,
  FileAudio,
  Bot,
  AlertTriangle,
  Award,
  Layers,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services - Sonexa AI Voice Intelligence Solutions",
  description: "Comprehensive voice intelligence services including AI transcription, sentiment analysis, voice analytics, and custom solutions.",
};

const services = [
  {
    icon: Brain,
    title: "AI Voice Transcription",
    description: "Convert speech to text with industry-leading accuracy across 120+ languages",
    features: ["99.8% accuracy rate", "Real-time processing", "Custom vocabulary", "Speaker identification"],
    pricing: "Starting at $0.10/minute",
    badge: "Most Popular",
  },
  {
    icon: BarChart3,
    title: "Voice Analytics & Insights",
    description: "Extract deep insights from voice data with advanced analytics and reporting",
    features: ["Sentiment analysis", "Emotion detection", "Keyword tracking", "Trend analysis"],
    pricing: "Starting at $99/month",
    badge: "Enterprise",
  },
  {
    icon: Headphones,
    title: "Customer Support Intelligence",
    description: "Optimize customer support with AI-powered call analysis and quality assurance",
    features: ["Call quality scoring", "Agent performance", "Customer satisfaction", "Training insights"],
    pricing: "Custom pricing",
    badge: "Pro",
  },
  {
    icon: MessageSquare,
    title: "Sales Call Analysis",
    description: "Boost sales performance with intelligent analysis of sales conversations",
    features: ["Conversion insights", "Lead qualification", "Objection handling", "Win/loss analysis"],
    pricing: "Starting at $199/month",
    badge: "Sales",
  },
  {
    icon: Shield,
    title: "Compliance Monitoring",
    description: "Ensure regulatory compliance with automated voice data monitoring",
    features: ["Risk assessment", "Compliance reporting", "Alert system", "Audit trails"],
    pricing: "Contact sales",
    badge: "Secure",
  },
  {
    icon: Bot,
    title: "Voice AI Integration",
    description: "Integrate voice intelligence into your existing systems and workflows",
    features: ["API integration", "Custom connectors", "Webhook support", "Real-time streaming"],
    pricing: "Starting at $299/month",
    badge: "Developer",
  },
];

const solutions = [
  {
    icon: Phone,
    title: "Call Center Solutions",
    description: "Transform your call center operations with AI-powered voice intelligence",
    industries: ["Customer Service", "Sales", "Tech Support", "Healthcare"],
  },
  {
    icon: Video,
    title: "Meeting Intelligence",
    description: "Extract insights from meetings, conferences, and video calls",
    industries: ["Corporate", "Education", "Legal", "Consulting"],
  },
  {
    icon: Mic,
    title: "Voice Survey Analysis",
    description: "Analyze voice feedback and surveys for market research and insights",
    industries: ["Market Research", "Product Development", "UX Research", "Academic"],
  },
  {
    icon: AlertTriangle,
    title: "Risk & Compliance",
    description: "Monitor voice communications for compliance and risk management",
    industries: ["Financial Services", "Healthcare", "Government", "Legal"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "We analyze your needs and design a custom voice intelligence solution",
  },
  {
    step: "02",
    title: "Integration",
    description: "Seamless integration with your existing systems and workflows",
  },
  {
    step: "03",
    title: "Training",
    description: "Custom AI model training on your specific domain and requirements",
  },
  {
    step: "04",
    title: "Deployment",
    description: "Go live with full support and monitoring from our expert team",
  },
  {
    step: "05",
    title: "Optimization",
    description: "Continuous improvement and optimization based on performance data",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-8 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="top-1/4 left-1/4 absolute bg-blue-500/20 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
          <div className="right-1/4 bottom-1/4 absolute bg-purple-500/20 blur-3xl rounded-full w-80 h-80"></div>
        </div>

        <div className="z-10 relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-6 py-3 border border-white/20 rounded-full">
            <Sparkles className="mr-2 w-5 h-5 text-yellow-400" />
            <span className="font-medium text-white">Professional Voice Intelligence</span>
          </div>

          <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl leading-tight">
            Voice Intelligence
            <span className="block bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent">
              Services & Solutions
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-blue-100 text-xl md:text-2xl leading-relaxed">
            Comprehensive voice AI services designed to transform your business operations.
            From transcription to advanced analytics, we've got you covered.
          </p>

          <div className="flex sm:flex-row flex-col justify-center gap-6">
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 hover:from-cyan-600 to-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/auth/register"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 border border-white/20 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              Comprehensive voice intelligence solutions for every business need
            </p>
          </div>

          <div className="gap-8 grid lg:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 rounded-3xl transition-all duration-300 overflow-hidden"
              >
                {service.badge && (
                  <div className="top-6 right-6 absolute bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 rounded-full font-medium text-white text-sm">
                    {service.badge}
                  </div>
                )}
                
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-4 font-bold text-white text-2xl">{service.title}</h3>
                    <p className="mb-6 text-slate-300 text-lg leading-relaxed">{service.description}</p>
                    
                    <ul className="mb-6 space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300">
                          <CheckCircle className="mr-3 w-5 h-5 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-center">
                      <div className="font-bold text-cyan-400 text-lg">{service.pricing}</div>
                      <a
                        href="/contact"
                        className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-2 rounded-xl font-medium text-white hover:scale-105 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="px-8 py-24 bg-slate-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Industry Solutions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              Tailored voice intelligence solutions for specific industries
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <solution.icon className="mb-6 w-12 h-12 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                <h3 className="mb-4 font-bold text-white text-xl">{solution.title}</h3>
                <p className="mb-6 text-slate-300 leading-relaxed">{solution.description}</p>
                
                <div className="space-y-2">
                  {solution.industries.map((industry, i) => (
                    <div key={i} className="text-cyan-400 text-sm">• {industry}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              How we deliver exceptional voice intelligence solutions
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transform -translate-y-1/2"></div>
            
            <div className="gap-8 grid md:grid-cols-5">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="inline-flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-600 mb-6 rounded-full w-16 h-16 font-bold text-white text-xl">
                    {step.step}
                  </div>
                  <h3 className="mb-4 font-bold text-white text-lg">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-24 bg-slate-800/50">
        <div className="mx-auto max-w-6xl">
          <div className="gap-8 grid md:grid-cols-4 text-center">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <div className="mb-4 font-bold text-cyan-400 text-4xl">99.8%</div>
              <div className="text-white">Accuracy Rate</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <div className="mb-4 font-bold text-cyan-400 text-4xl">120+</div>
              <div className="text-white">Languages Supported</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <div className="mb-4 font-bold text-cyan-400 text-4xl">10,000+</div>
              <div className="text-white">Happy Customers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <div className="mb-4 font-bold text-cyan-400 text-4xl">24/7</div>
              <div className="text-white">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-12 rounded-3xl">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Ready to Transform Your Voice Data?
            </h2>
            <p className="mb-8 text-slate-300 text-xl leading-relaxed">
              Let's discuss how our voice intelligence services can help your business
              unlock the power of voice data and drive meaningful results.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-6">
              <a
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 hover:from-cyan-600 to-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                Contact Sales
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/auth/register"
                className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 border border-white/20 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
