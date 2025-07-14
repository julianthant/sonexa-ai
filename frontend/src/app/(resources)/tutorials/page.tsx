import { Metadata } from "next";
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, Video, Code, Zap, FileText, Headphones, Database } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutorials | Sonexa AI",
  description: "Learn how to use Sonexa AI with our comprehensive tutorials and guides. From getting started to advanced techniques.",
};

export default function TutorialsPage() {
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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn Sonexa AI
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Tutorials & Guides
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Master voice analytics with our comprehensive tutorials. From quick starts to advanced techniques, we've got you covered.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Video className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">50+</div>
              <div className="text-slate-600">Video Tutorials</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">100+</div>
              <div className="text-slate-600">Written Guides</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">10,000+</div>
              <div className="text-slate-600">Students</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">4.9</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Getting Started</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  New to Sonexa AI? Start here with our beginner-friendly tutorials.
                </p>
                <div className="text-sm text-slate-500">12 tutorials • 2 hours</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Headphones className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Voice Processing</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Learn advanced voice processing and analysis techniques.
                </p>
                <div className="text-sm text-slate-500">18 tutorials • 4 hours</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Code className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">API Integration</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Integrate Sonexa AI into your applications with our API guides.
                </p>
                <div className="text-sm text-slate-500">15 tutorials • 3 hours</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Database className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Data Management</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Organize, manage, and export your voice data effectively.
                </p>
                <div className="text-sm text-slate-500">10 tutorials • 2.5 hours</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Advanced Features</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Unlock the full potential of Sonexa AI with advanced features.
                </p>
                <div className="text-sm text-slate-500">20 tutorials • 5 hours</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <Video className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Video Series</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Comprehensive video courses for visual learners.
                </p>
                <div className="text-sm text-slate-500">8 series • 12 hours</div>
              </div>
            </div>
          </div>

          {/* Featured Tutorials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Featured Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Video</span>
                    <span className="flex items-center text-slate-500 text-sm ml-auto">
                      <Clock className="w-4 h-4 mr-1" />
                      15 min
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Getting Started with Sonexa AI
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Learn the basics of voice analytics and set up your first project in under 15 minutes.
                  </p>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Watch Tutorial →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-32 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Guide</span>
                    <span className="flex items-center text-slate-500 text-sm ml-auto">
                      <Clock className="w-4 h-4 mr-1" />
                      10 min
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Advanced Voice Analysis
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Deep dive into sentiment analysis, emotion detection, and voice pattern recognition.
                  </p>
                  <Link href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Read Guide →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-32 flex items-center justify-center">
                  <Code className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Code</span>
                    <span className="flex items-center text-slate-500 text-sm ml-auto">
                      <Clock className="w-4 h-4 mr-1" />
                      30 min
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    API Integration Guide
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Step-by-step guide to integrate Sonexa AI into your existing applications.
                  </p>
                  <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    View Code →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Learning Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Beginner Path</h3>
                    <p className="text-slate-600">Perfect for newcomers to voice analytics</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Introduction to Voice Analytics</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Setting Up Your First Project</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Basic Analysis Techniques</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Interpreting Results</span>
                  </div>
                </div>
                <Link href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Learning
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Advanced Path</h3>
                    <p className="text-slate-600">For experienced users seeking mastery</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span>Advanced AI Models</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span>Custom Integration Patterns</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span>Performance Optimization</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span>Enterprise Deployment</span>
                  </div>
                </div>
                <Link href="#" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master Voice Analytics?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start your learning journey today with our comprehensive tutorials and guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse All Tutorials
              </Link>
              <Link 
                href="#" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Watch Video Series
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
