import { Metadata } from "next";
import {
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Code,
  Brain,
  Headphones,
  TrendingUp,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers - Join Sonexa AI",
  description: "Join our mission to transform voice data into actionable intelligence. Explore career opportunities at Sonexa AI.",
};

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Top-tier salaries, equity, and comprehensive benefits package",
  },
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere with flexible hours and global collaboration",
  },
  {
    icon: Brain,
    title: "Learning & Growth",
    description: "Annual learning budget, conferences, and mentorship programs",
  },
];

const openRoles = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Build and scale our AI models for voice intelligence.",
    requirements: ["5+ years ML/AI experience", "Python, TensorFlow/PyTorch"],
  },
  {
    title: "Product Manager - Voice AI",
    department: "Product",
    location: "Remote / New York",
    type: "Full-time",
    description: "Lead product strategy for our voice intelligence platform.",
    requirements: ["3+ years product management", "AI/ML product experience"],
  },
];

export default function CareersPage() {
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
            <Star className="mr-2 w-5 h-5 text-yellow-400" />
            <span className="font-medium text-white">Join Our Mission</span>
          </div>

          <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl leading-tight">
            Shape the Future of
            <span className="block bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent">
              Voice Intelligence
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-blue-100 text-xl md:text-2xl leading-relaxed">
            Join a team of innovators building the next generation of AI-powered voice intelligence.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Benefits & Perks
            </h2>
          </div>

          <div className="gap-8 grid md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300"
              >
                <benefit.icon className="mb-6 w-12 h-12 text-cyan-400" />
                <h3 className="mb-4 font-bold text-white text-xl">{benefit.title}</h3>
                <p className="text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="px-8 py-24 bg-slate-800/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Open Positions
            </h2>
          </div>

          <div className="gap-8 grid lg:grid-cols-2">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl"
              >
                <h3 className="mb-2 font-bold text-white text-2xl">{role.title}</h3>
                <div className="flex gap-3 mb-4">
                  <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-sm">
                    {role.department}
                  </span>
                  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-400 text-sm">
                    {role.type}
                  </span>
                </div>

                <div className="flex items-center mb-4 text-slate-400">
                  <MapPin className="mr-2 w-4 h-4" />
                  {role.location}
                </div>

                <p className="mb-6 text-slate-300">{role.description}</p>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-semibold text-white">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
