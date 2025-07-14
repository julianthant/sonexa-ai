import { Metadata } from "next";
import { ArrowRight, Calendar, User, Clock, Tag, TrendingUp, BookOpen, MessageSquare, Star, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Sonexa AI Voice Intelligence Platform",
  description: "Latest insights, tutorials, and updates on AI voice intelligence technology and industry trends.",
};

const featuredPost = {
  title: "The Future of Voice AI: 5 Trends Shaping 2025",
  excerpt: "Discover the emerging trends in voice AI technology that are transforming industries and creating new opportunities for businesses worldwide.",
  author: "Sarah Chen",
  date: "July 10, 2025",
  readTime: "8 min read",
  category: "Industry Insights",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
  featured: true
};

const blogPosts = [
  {
    title: "How to Improve Voice Transcription Accuracy",
    excerpt: "Learn best practices for optimizing voice transcription accuracy in your applications with practical tips and techniques.",
    author: "Mike Johnson",
    date: "July 8, 2025",
    readTime: "6 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    title: "Voice Analytics in Customer Service: A Complete Guide",
    excerpt: "Explore how voice analytics can transform your customer service operations and improve customer satisfaction.",
    author: "Emily Rodriguez",
    date: "July 5, 2025",
    readTime: "10 min read",
    category: "Use Cases",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    title: "Building Real-time Voice Applications with Sonexa AI",
    excerpt: "Step-by-step guide to building real-time voice processing applications using our API and SDKs.",
    author: "David Kim",
    date: "July 3, 2025",
    readTime: "12 min read",
    category: "Developer",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    title: "Privacy and Security in Voice AI: What You Need to Know",
    excerpt: "Understanding the importance of privacy and security in voice AI applications and how Sonexa AI protects your data.",
    author: "Alex Thompson",
    date: "June 30, 2025",
    readTime: "7 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    title: "Voice AI ROI: Measuring the Impact on Your Business",
    excerpt: "Learn how to calculate and measure the return on investment when implementing voice AI solutions in your organization.",
    author: "Jessica Wang",
    date: "June 28, 2025",
    readTime: "9 min read",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    title: "Multi-language Voice Processing: Global Opportunities",
    excerpt: "Discover how multi-language voice processing can help your business expand globally and serve diverse markets.",
    author: "Carlos Martinez",
    date: "June 25, 2025",
    readTime: "8 min read",
    category: "Global",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
  }
];

const categories = [
  "All Posts",
  "Industry Insights",
  "Tutorial",
  "Use Cases",
  "Developer",
  "Security",
  "Business",
  "Global"
];

const popularTags = [
  "Voice AI",
  "Machine Learning",
  "Speech Recognition",
  "Natural Language Processing",
  "API Integration",
  "Real-time Processing",
  "Customer Service",
  "Enterprise Solutions"
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <BookOpen className="w-4 h-4 mr-2" />
            Expert Insights & Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Sonexa AI
            <span className="block">Blog</span>
          </h1>
          <p className="text-xl text-pink-100 mb-12 max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and industry trends in voice AI technology.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-gray-900">Featured Article</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-yellow-500 ml-4">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-500 ml-1">Featured</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-pink-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
                <p className="text-gray-600">Stay informed with our latest insights and updates</p>
              </div>
              
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-3">
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Popular Tags */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-800 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                  <p className="text-pink-100 mb-4 text-sm">
                    Get the latest articles and insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="w-full bg-white text-pink-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">25 new articles this month</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MessageSquare className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-gray-600">150+ comments this week</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-gray-600">500+ new subscribers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of developers and businesses using Sonexa AI for voice intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="bg-transparent text-white px-6 py-2.5 rounded-lg font-medium text-sm border border-white/30 hover:border-white/50 hover:bg-white/10 transition-colors duration-200">
              Read Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
