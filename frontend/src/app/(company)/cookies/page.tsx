import { Metadata } from "next";
import { ArrowLeft, Cookie, Eye, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - Sonexa AI Voice Intelligence Platform",
  description: "Cookie Policy for Sonexa AI. Learn how we use cookies and similar technologies to improve your experience.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-amber-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Cookie className="w-4 h-4 mr-2" />
            Cookie Information
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-amber-100 mb-4">
            How we use cookies and similar technologies to enhance your experience
          </p>
          <div className="flex items-center justify-center text-amber-100">
            <Eye className="w-4 h-4 mr-2" />
            Last updated: July 13, 2025
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              analyzing how you use our services.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Essential Cookies</h3>
                <p className="text-blue-800 text-sm mb-3">Required for basic website functionality</p>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• User authentication</li>
                  <li>• Security features</li>
                  <li>• Form submissions</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Analytics Cookies</h3>
                <p className="text-green-800 text-sm mb-3">Help us understand website usage</p>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• Page views and traffic</li>
                  <li>• User behavior patterns</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Functional Cookies</h3>
                <p className="text-purple-800 text-sm mb-3">Remember your preferences</p>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• Language settings</li>
                  <li>• Theme preferences</li>
                  <li>• User interface customization</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="font-semibold text-amber-900 mb-3">Marketing Cookies</h3>
                <p className="text-amber-800 text-sm mb-3">Deliver relevant advertisements</p>
                <ul className="space-y-1 text-amber-700 text-sm">
                  <li>• Targeted advertising</li>
                  <li>• Social media integration</li>
                  <li>• Campaign tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Control */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                You have control over the cookies we use. You can manage your preferences through:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Our cookie consent banner</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Your browser settings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Our privacy preference center</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@sonexa.ai" className="text-amber-600 hover:text-amber-700">
                privacy@sonexa.ai
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
