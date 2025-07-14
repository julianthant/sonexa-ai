import { Metadata } from "next";
import { Search, BookOpen, MessageCircle, Video, FileText, Mail, Phone, Clock, Users, Zap, HelpCircle, ArrowRight, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center - Sonexa AI Voice Intelligence Platform",
  description: "Get help and support for Sonexa AI. Browse documentation, tutorials, and contact our support team.",
};

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics and set up your account",
    articles: 12,
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Zap,
    title: "API Documentation",
    description: "Complete developer guides and references",
    articles: 18,
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: FileText,
    title: "Tutorials",
    description: "Step-by-step guides and walkthroughs",
    articles: 24,
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and solutions",
    articles: 15,
    color: "from-orange-500 to-red-600"
  }
];

const popularArticles = [
  "How to get started with the API",
  "Setting up webhooks",
  "Understanding voice analysis results",
  "Billing and subscription management",
  "Security best practices",
  "Integration with Slack",
  "Real-time transcription setup",
  "Privacy Policy",
  "Terms of Service",
  "GDPR compliance"
];

const supportOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    action: "support@sonexa.ai",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team instantly",
    action: "Start Chat",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Enterprise customers only",
    action: "+1 (555) 123-4567",
    color: "from-purple-500 to-indigo-600"
  }
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to your questions and get the most out of Sonexa AI
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find what you're looking for in our organized help sections</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Articles</h2>
            <p className="text-xl text-gray-600">Most viewed help articles this month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-200">
            {popularArticles.map((article, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">{article}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">Our support team is here to assist you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6">{option.description}</p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers and businesses using Sonexa AI for voice intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="bg-transparent text-white px-6 py-2.5 rounded-lg font-medium text-sm border border-white/30 hover:border-white/50 hover:bg-white/10 transition-colors duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
