import { Metadata } from "next";
import { ArrowLeft, TrendingUp, Users, Clock, Star, Building, Phone, Headphones, BarChart3, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | Sonexa AI",
  description: "Discover how businesses are transforming their voice analytics with Sonexa AI. Real results, proven success stories.",
};

export default function CaseStudiesPage() {
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
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Discover how leading companies are transforming their operations with Sonexa AI. Real results, proven success stories.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">95%</div>
              <div className="text-slate-600">Accuracy Improvement</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">60%</div>
              <div className="text-slate-600">Time Reduction</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">500+</div>
              <div className="text-slate-600">Companies</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">4.9</div>
              <div className="text-slate-600">Satisfaction Score</div>
            </div>
          </div>

          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium">
              All Industries
            </button>
            <button className="bg-white text-slate-600 hover:bg-slate-100 px-6 py-2 rounded-full font-medium transition-colors">
              Healthcare
            </button>
            <button className="bg-white text-slate-600 hover:bg-slate-100 px-6 py-2 rounded-full font-medium transition-colors">
              Financial Services
            </button>
            <button className="bg-white text-slate-600 hover:bg-slate-100 px-6 py-2 rounded-full font-medium transition-colors">
              Customer Service
            </button>
            <button className="bg-white text-slate-600 hover:bg-slate-100 px-6 py-2 rounded-full font-medium transition-colors">
              Education
            </button>
            <button className="bg-white text-slate-600 hover:bg-slate-100 px-6 py-2 rounded-full font-medium transition-colors">
              Technology
            </button>
          </div>

          {/* Featured Case Studies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Featured Success Stories
            </h2>
            <div className="space-y-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Building className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">HealthFirst</h3>
                      <p className="text-blue-100">Healthcare Provider</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Transforming Patient Communication with Voice Analytics
                    </h3>
                    <p className="text-slate-600 mb-6">
                      HealthFirst implemented Sonexa AI to analyze patient calls, improving triage efficiency by 75% and patient satisfaction scores by 40%. The system now processes over 10,000 calls daily, automatically categorizing urgent cases and providing real-time insights to medical staff.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">75%</div>
                        <div className="text-sm text-slate-600">Faster Triage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">40%</div>
                        <div className="text-sm text-slate-600">Higher Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">10K+</div>
                        <div className="text-sm text-slate-600">Daily Calls</div>
                      </div>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                      Read Full Case Study <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-green-500 to-green-600 p-8 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Phone className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">TechSupport Pro</h3>
                      <p className="text-green-100">Customer Service</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Revolutionizing Customer Support with AI-Powered Insights
                    </h3>
                    <p className="text-slate-600 mb-6">
                      TechSupport Pro leveraged Sonexa AI to analyze customer sentiment in real-time, reducing resolution time by 50% and increasing first-call resolution rates to 85%. The platform now handles 25,000+ support interactions monthly with enhanced quality monitoring.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">50%</div>
                        <div className="text-sm text-slate-600">Faster Resolution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-slate-600">First-Call Resolution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">25K+</div>
                        <div className="text-sm text-slate-600">Monthly Interactions</div>
                      </div>
                    </div>
                    <Link href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                      Read Full Case Study <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-purple-600 p-8 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">EduConnect</h3>
                      <p className="text-purple-100">Education Platform</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Enhancing Online Learning with Voice-Powered Analytics
                    </h3>
                    <p className="text-slate-600 mb-6">
                      EduConnect integrated Sonexa AI to analyze student engagement in virtual classrooms, improving learning outcomes by 60% and teacher effectiveness ratings by 45%. The platform now serves 50,000+ students with personalized learning insights.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">60%</div>
                        <div className="text-sm text-slate-600">Better Outcomes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">45%</div>
                        <div className="text-sm text-slate-600">Teacher Effectiveness</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">50K+</div>
                        <div className="text-sm text-slate-600">Students Served</div>
                      </div>
                    </div>
                    <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center">
                      Read Full Case Study <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Spotlight */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Industry Applications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Headphones className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Healthcare</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Patient triage, medical transcription, and treatment compliance monitoring.
                </p>
                <div className="text-sm text-slate-500">15+ implementations</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Financial Services</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Fraud detection, customer onboarding, and compliance monitoring.
                </p>
                <div className="text-sm text-slate-500">25+ implementations</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Customer Service</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Quality assurance, sentiment analysis, and agent performance optimization.
                </p>
                <div className="text-sm text-slate-500">40+ implementations</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Student engagement tracking, language learning, and accessibility support.
                </p>
                <div className="text-sm text-slate-500">20+ implementations</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Target className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Sales & Marketing</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Lead qualification, conversion optimization, and customer insights.
                </p>
                <div className="text-sm text-slate-500">30+ implementations</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Research & Analytics</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Market research, user feedback analysis, and behavioral insights.
                </p>
                <div className="text-sm text-slate-500">12+ implementations</div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Calculate Your ROI</h2>
              <p className="text-slate-300 text-lg">
                See how much you could save with Sonexa AI voice analytics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">$2.3M</div>
                <div className="text-slate-300">Average Annual Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">18x</div>
                <div className="text-slate-300">Return on Investment</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">6 months</div>
                <div className="text-slate-300">Payback Period</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="#" 
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Calculate Your ROI <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join hundreds of companies already transforming their operations with Sonexa AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Schedule a Demo
              </Link>
              <Link 
                href="#" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Download Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
