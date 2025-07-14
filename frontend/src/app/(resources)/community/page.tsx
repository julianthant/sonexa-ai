import { Metadata } from "next";
import { ArrowLeft, Users, MessageCircle, Heart, Github, Calendar, Trophy, Star, BookOpen, Video, Zap, Coffee } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community | Sonexa AI",
  description: "Join the Sonexa AI community. Connect with other users, share insights, and get support from our vibrant community of voice analytics professionals.",
};

export default function CommunityPage() {
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
              <Users className="w-4 h-4 mr-2" />
              Join Our Community
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Welcome to the Sonexa AI Community
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Connect with voice analytics professionals, share insights, get support, and help shape the future of AI-powered voice intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Join Discord Community
              </Link>
              <Link 
                href="#" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                GitHub Discussions
              </Link>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">5,000+</div>
              <div className="text-slate-600">Active Members</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">15,000+</div>
              <div className="text-slate-600">Messages</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-slate-600">Satisfaction</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Github className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">200+</div>
              <div className="text-slate-600">Contributors</div>
            </div>
          </div>

          {/* Community Channels */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Community Channels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">General Discussion</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Share ideas, ask questions, and connect with other voice analytics professionals.
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Join Discussion →
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Tutorials & Guides</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Learn from community-created tutorials and share your own knowledge.
                </p>
                <Link href="#" className="text-green-600 hover:text-green-700 font-medium">
                  Browse Tutorials →
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Video className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Office Hours</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Weekly live sessions with our team to answer questions and get help.
                </p>
                <Link href="#" className="text-red-600 hover:text-red-700 font-medium">
                  Join Office Hours →
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Feature Requests</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Suggest new features and vote on what the community wants most.
                </p>
                <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Make Requests →
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Trophy className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Showcase</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Show off your amazing projects and get inspired by others' work.
                </p>
                <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  View Showcase →
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Coffee className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">Coffee Chat</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Casual conversations about industry trends and networking.
                </p>
                <Link href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                  Join Chat →
                </Link>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Community Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Be Respectful</h3>
                <p className="text-slate-600 mb-4">
                  Treat all community members with respect and kindness. We welcome diverse perspectives and experiences.
                </p>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Stay On Topic</h3>
                <p className="text-slate-600 mb-4">
                  Keep discussions relevant to voice analytics, AI, and related technologies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Help Others</h3>
                <p className="text-slate-600 mb-4">
                  Share your knowledge and help newcomers learn. Everyone benefits when we support each other.
                </p>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-4">No Spam</h3>
                <p className="text-slate-600 mb-4">
                  Avoid promotional content and spam. Focus on valuable contributions to the community.
                </p>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">July 20, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Voice AI Workshop
                </h3>
                <p className="text-slate-600 mb-4">
                  Join our hands-on workshop on building voice analytics applications with Sonexa AI.
                </p>
                <Link href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Register Now
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-600 font-medium">July 27, 2025</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Community Meetup
                </h3>
                <p className="text-slate-600 mb-4">
                  Virtual meetup to share experiences, network, and discuss the latest in voice technology.
                </p>
                <Link href="#" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Join Meetup
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Connect with thousands of voice analytics professionals and start collaborating today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Join Discord
              </Link>
              <Link 
                href="#" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
