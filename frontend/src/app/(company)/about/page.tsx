import { Metadata } from "next";
import {
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Shield,
  Zap,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Sonexa AI",
  description:
    "Learn about Sonexa AI's mission to transform voice data into actionable intelligence with cutting-edge AI technology.",
};

const stats = [
  { label: "Companies Trust Us", value: "10,000+", icon: Users },
  { label: "Countries Served", value: "50+", icon: Globe },
  { label: "Voice Messages Processed", value: "100M+", icon: Zap },
  { label: "Years of Innovation", value: "5+", icon: Award },
];

const timeline = [
  {
    year: "2019",
    title: "Foundation",
    description:
      "Started with a vision to make voice data actionable for businesses worldwide.",
  },
  {
    year: "2020",
    title: "First AI Model",
    description:
      "Launched our first voice intelligence AI model with 95% accuracy.",
  },
  {
    year: "2021",
    title: "Series A",
    description:
      "Raised $15M Series A to accelerate product development and team growth.",
  },
  {
    year: "2022",
    title: "Enterprise Launch",
    description: "Launched enterprise features serving Fortune 500 companies.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with multi-language support.",
  },
  {
    year: "2024",
    title: "AI Revolution",
    description:
      "Introduced next-gen AI models with real-time voice intelligence.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly push the boundaries of what's possible with AI and voice technology.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "Your data is sacred. We maintain the highest standards of security and privacy.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description:
      "Our success is measured by the value we create for our customers.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from code to customer service.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Back to Home Button */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-8 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="top-0 left-1/3 absolute bg-blue-500/20 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
          <div className="right-1/3 bottom-0 absolute bg-purple-500/20 blur-3xl rounded-full w-80 h-80"></div>
        </div>

        <div className="z-10 relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-6 py-3 border border-white/20 rounded-full">
            <Star className="mr-2 w-5 h-5 text-yellow-400" />
            <span className="font-medium text-white">
              Trusted by 10,000+ Companies
            </span>
          </div>

          <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl leading-tight">
            Transforming Voice Data Into
            <span className="block bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent">
              Actionable Intelligence
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-blue-100 text-xl md:text-2xl leading-relaxed">
            We're on a mission to unlock the hidden insights in voice
            communications, empowering businesses to make smarter decisions with
            AI-powered voice intelligence.
          </p>

          {/* Stats Grid */}
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-4xl">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <stat.icon className="mx-auto mb-4 w-12 h-12 text-cyan-400" />
                <div className="mb-2 font-bold text-white text-3xl">
                  {stat.value}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="items-center gap-16 grid lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
                Our Story
              </h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Sonexa AI was born from a simple observation: voice
                  communications contain a wealth of untapped insights that
                  could revolutionize how businesses understand their customers
                  and optimize their operations.
                </p>
                <p>
                  Founded in 2019 by AI researchers from Stanford and industry
                  veterans from Google and Apple, we set out to build the most
                  advanced voice intelligence platform in the world.
                </p>
                <p>
                  Today, we process over 100 million voice messages monthly,
                  helping companies across 50+ countries unlock insights that
                  drive growth, improve customer satisfaction, and streamline
                  operations.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 rounded-3xl">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <TrendingUp className="mb-6 w-16 h-16 text-cyan-400" />
                <h3 className="mb-4 font-bold text-white text-2xl">
                  Growth That Matters
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Our success isn't just measured in numbers—it's measured in
                  the transformative impact we create for our customers'
                  businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-800/50 px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              From a small startup to a global AI platform trusted by thousands
            </p>
          </div>

          <div className="relative">
            <div className="left-1/2 absolute bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full w-1 h-full -translate-x-1/2 transform"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                    <div className="mb-2 font-bold text-cyan-400 text-2xl">
                      {item.year}
                    </div>
                    <h3 className="mb-3 font-bold text-white text-xl">
                      {item.title}
                    </h3>
                    <p className="text-slate-300">{item.description}</p>
                  </div>
                </div>

                <div className="left-1/2 absolute bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full w-6 h-6 -translate-x-1/2 transform"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-xl">
              The principles that guide everything we do
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <value.icon className="mb-6 w-12 h-12 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                <h3 className="mb-4 font-bold text-white text-xl">
                  {value.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-12 rounded-3xl">
            <h2 className="mb-6 font-bold text-white text-3xl md:text-4xl">
              Ready to Join Our Mission?
            </h2>
            <p className="mb-8 text-slate-300 text-xl leading-relaxed">
              Whether you're looking to transform your business with voice
              intelligence or join our team of innovators, we'd love to hear
              from you.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/auth/register"
                className="inline-flex items-center bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a
                href="/careers"
                className="inline-flex items-center bg-transparent text-white px-6 py-2.5 rounded-lg font-medium text-sm border border-white/30 hover:border-white/50 hover:bg-white/10 transition-colors duration-200"
              >
                View Careers
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
