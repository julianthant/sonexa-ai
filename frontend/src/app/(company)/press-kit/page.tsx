import { Metadata } from "next";
import {
  Download,
  Image,
  FileText,
  Video,
  Users,
  Calendar,
  Award,
  ExternalLink,
  Camera,
  Mic,
  Globe,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press Kit - Sonexa AI Voice Intelligence Platform",
  description:
    "Download media resources, brand assets, and press materials for Sonexa AI. Logos, images, and company information for media use.",
};

const brandAssets = [
  {
    category: "Logos",
    items: [
      {
        name: "Primary Logo (PNG)",
        description: "High-resolution logo for light backgrounds",
        size: "2.3 MB",
        format: "PNG",
        icon: Image,
      },
      {
        name: "Logo Variations (ZIP)",
        description: "Complete logo package with all variations",
        size: "8.7 MB",
        format: "ZIP",
        icon: Image,
      },
      {
        name: "Brand Guidelines (PDF)",
        description: "Complete brand guidelines and usage instructions",
        size: "4.1 MB",
        format: "PDF",
        icon: FileText,
      },
    ],
  },
  {
    category: "Product Screenshots",
    items: [
      {
        name: "Dashboard Interface",
        description: "High-resolution dashboard screenshots",
        size: "5.2 MB",
        format: "ZIP",
        icon: Image,
      },
      {
        name: "Mobile App Screens",
        description: "Mobile application interface screenshots",
        size: "3.8 MB",
        format: "ZIP",
        icon: Image,
      },
      {
        name: "API Documentation",
        description: "Developer portal and API interface",
        size: "2.1 MB",
        format: "ZIP",
        icon: Image,
      },
    ],
  },
  {
    category: "Media Assets",
    items: [
      {
        name: "Product Demo Video",
        description: "Official product demonstration video",
        size: "125 MB",
        format: "MP4",
        icon: Video,
      },
      {
        name: "Company Overview Video",
        description: "Company introduction and mission video",
        size: "89 MB",
        format: "MP4",
        icon: Video,
      },
      {
        name: "Executive Photos",
        description: "High-resolution executive team photos",
        size: "12 MB",
        format: "ZIP",
        icon: Camera,
      },
    ],
  },
];

const pressReleases = [
  {
    title:
      "Sonexa AI Raises $50M Series B to Accelerate Voice Intelligence Platform",
    date: "June 15, 2025",
    excerpt:
      "Funding will be used to expand AI capabilities and global market presence",
    type: "Funding",
  },
  {
    title:
      "Sonexa AI Launches Real-time Voice Analytics for Enterprise Customers",
    date: "May 20, 2025",
    excerpt:
      "New features enable instant voice sentiment analysis and speaker identification",
    type: "Product Launch",
  },
  {
    title:
      "Sonexa AI Partners with Microsoft to Integrate Voice Intelligence into Teams",
    date: "April 10, 2025",
    excerpt:
      "Strategic partnership brings advanced voice analytics to Microsoft Teams users",
    type: "Partnership",
  },
  {
    title:
      "Sonexa AI Achieves SOC 2 Type II Certification for Enterprise Security",
    date: "March 5, 2025",
    excerpt:
      "Certification demonstrates commitment to enterprise-grade security and compliance",
    type: "Certification",
  },
];

const companyFacts = [
  { label: "Founded", value: "2020" },
  { label: "Headquarters", value: "San Francisco, CA" },
  { label: "Employees", value: "250+" },
  { label: "Customers", value: "10,000+" },
  { label: "Languages Supported", value: "120+" },
  { label: "API Calls/Month", value: "500M+" },
  { label: "Funding Raised", value: "$85M" },
  { label: "Industries Served", value: "15+" },
];

const executiveTeam = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of AI at Google, Stanford CS PhD",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-founder",
    bio: "Ex-Amazon Alexa team lead, MIT graduate",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Emily Watson",
    role: "VP of Product",
    bio: "Former product leader at Zoom and Slack",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Ex-Tesla Autopilot team, Berkeley PhD",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const awards = [
  {
    title: "Best AI Startup 2025",
    organization: "TechCrunch",
    year: "2025",
  },
  {
    title: "Innovation in Voice Technology",
    organization: "VentureBeat",
    year: "2024",
  },
  {
    title: "Top 100 AI Companies",
    organization: "CB Insights",
    year: "2024",
  },
  {
    title: "Fastest Growing SaaS",
    organization: "Inc. 5000",
    year: "2024",
  },
];

export default function PressKitPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
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
      <section className="relative bg-gradient-to-r from-violet-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-4 py-2 rounded-full font-medium text-white text-sm">
            <Camera className="mr-2 w-4 h-4" />
            Media Resources
          </div>
          <h1 className="mb-6 font-bold text-white text-5xl md:text-6xl">
            Press Kit
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-violet-100 text-xl">
            Find everything you need to cover Sonexa AI - from brand assets and
            company information to executive photos and press releases.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <button className="inline-flex items-center bg-white hover:bg-gray-50 px-6 py-3 rounded-lg font-medium text-violet-600 transition-colors">
              <Download className="mr-2 w-4 h-4" />
              Download All Assets
            </button>
            <button className="inline-flex items-center hover:bg-white px-6 py-3 border-2 border-white rounded-lg font-medium text-white hover:text-violet-600 transition-colors">
              <Mail className="mr-2 w-4 h-4" />
              Contact Press Team
            </button>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Company Overview
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="mb-8 text-gray-600 text-xl">
                Sonexa AI is the leading voice intelligence platform that
                transforms audio data into actionable insights. Our advanced AI
                technology enables businesses to analyze, understand, and
                optimize voice interactions across customer service, sales, and
                communications.
              </p>
              <div className="gap-6 grid md:grid-cols-4">
                {companyFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md p-4 rounded-lg text-center"
                  >
                    <div className="mb-1 font-bold text-violet-600 text-2xl">
                      {fact.value}
                    </div>
                    <div className="text-gray-600 text-sm">{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Brand Assets
            </h2>
            <p className="text-gray-600 text-xl">
              Download high-quality logos, images, and brand materials
            </p>
          </div>

          <div className="space-y-12">
            {brandAssets.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="mb-6 font-bold text-gray-900 text-2xl">
                  {category.category}
                </h3>
                <div className="gap-6 grid md:grid-cols-3">
                  {category.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={itemIndex}
                        className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex justify-center items-center bg-gradient-to-r from-violet-500 to-purple-600 mr-3 rounded-lg w-10 h-10">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {item.name}
                            </h4>
                            <div className="text-gray-500 text-sm">
                              {item.format} • {item.size}
                            </div>
                          </div>
                        </div>
                        <p className="mb-4 text-gray-600">{item.description}</p>
                        <button className="inline-flex justify-center items-center bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg w-full text-white transition-colors">
                          <Download className="mr-2 w-4 h-4" />
                          Download
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Executive Team
            </h2>
            <p className="text-gray-600 text-xl">
              Meet the leadership team behind Sonexa AI
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {executiveTeam.map((exec, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-xl text-center"
              >
                <img
                  src={exec.image}
                  alt={exec.name}
                  className="mx-auto mb-4 rounded-full w-20 h-20 object-cover"
                />
                <h3 className="mb-1 font-semibold text-gray-900 text-lg">
                  {exec.name}
                </h3>
                <p className="mb-2 font-medium text-violet-600">{exec.role}</p>
                <p className="text-gray-600 text-sm">{exec.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Recent Press Releases
            </h2>
            <p className="text-gray-600 text-xl">
              Latest news and announcements from Sonexa AI
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-violet-100 mr-3 px-3 py-1 rounded-full font-medium text-violet-800 text-sm">
                        {release.type}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="mr-1 w-4 h-4" />
                        {release.date}
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                      {release.title}
                    </h3>
                    <p className="text-gray-600">{release.excerpt}</p>
                  </div>
                  <button className="ml-4 text-violet-600 hover:text-violet-800 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Awards & Recognition
            </h2>
            <p className="text-gray-600 text-xl">
              Industry recognition and achievements
            </p>
          </div>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-xl text-center"
              >
                <div className="flex justify-center items-center bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4 rounded-lg w-12 h-12">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  {award.title}
                </h3>
                <p className="mb-1 text-gray-600 text-sm">
                  {award.organization}
                </p>
                <p className="font-medium text-violet-600">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-white text-3xl">
            Media Inquiries
          </h2>
          <p className="mb-8 text-violet-100 text-xl">
            For press inquiries, interviews, or additional materials, please
            contact our media team.
          </p>
          <div className="gap-6 grid md:grid-cols-2 mx-auto max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
              <Mail className="mx-auto mb-3 w-8 h-8" />
              <h3 className="mb-1 font-semibold">Email</h3>
              <p className="text-violet-100">press@sonexa.ai</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
              <Users className="mx-auto mb-3 w-8 h-8" />
              <h3 className="mb-1 font-semibold">Media Relations</h3>
              <p className="text-violet-100">Sarah Johnson</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
