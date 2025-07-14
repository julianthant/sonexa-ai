import { Metadata } from "next";
import { ArrowLeft, Shield, Eye, Database, Users, Globe, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Sonexa AI Voice Intelligence Platform",
  description: "Privacy Policy for Sonexa AI. Learn how we protect and handle your data on our voice intelligence platform.",
};

const privacyData = {
  lastUpdated: "July 13, 2025",
  effectiveDate: "July 13, 2025"
};

const quickNav = [
  { id: "overview", title: "Privacy Overview" },
  { id: "collection", title: "Data Collection" },
  { id: "usage", title: "How We Use Data" },
  { id: "sharing", title: "Data Sharing" },
  { id: "security", title: "Security Measures" },
  { id: "rights", title: "Your Rights" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "retention", title: "Data Retention" },
  { id: "international", title: "International Transfers" },
  { id: "contact", title: "Contact Us" }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-green-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Your Privacy Matters
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-green-100 mb-4">
            How we protect, collect, and use your personal information
          </p>
          <div className="flex items-center justify-center text-green-100">
            <Eye className="w-4 h-4 mr-2" />
            Last updated: {privacyData.lastUpdated}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {quickNav.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-green-600 py-1 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Privacy at a Glance */}
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Privacy at a Glance</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      GDPR Compliant
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      SOC 2 Certified
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      End-to-End Encryption
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                      No Data Selling
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              
              {/* Privacy Overview */}
              <section id="overview">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Privacy Overview</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      At Sonexa AI, we are committed to protecting your privacy and handling your personal data with transparency. 
                      This Privacy Policy explains how we collect, use, process, and protect your information when you use our 
                      voice intelligence platform.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Our Privacy Commitment:</h4>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• We never sell your personal data to third parties</li>
                        <li>• We use industry-leading security measures to protect your data</li>
                        <li>• We are transparent about our data practices</li>
                        <li>• We comply with global privacy regulations including GDPR and CCPA</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Collection */}
              <section id="collection">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Account Information:</h4>
                        <ul className="space-y-1 text-gray-600 ml-4 text-sm">
                          <li>• Name, email address, and contact information</li>
                          <li>• Company details and billing information</li>
                          <li>• Account preferences and settings</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Voice Data:</h4>
                        <ul className="space-y-1 text-gray-600 ml-4 text-sm">
                          <li>• Audio recordings and voice samples</li>
                          <li>• Transcribed text and analyzed content</li>
                          <li>• Voice patterns and acoustic features</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Usage Information:</h4>
                        <ul className="space-y-1 text-gray-600 ml-4 text-sm">
                          <li>• API usage statistics and performance metrics</li>
                          <li>• Feature usage and interaction patterns</li>
                          <li>• Error logs and system diagnostics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section id="usage">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Service Delivery:</h4>
                        <ul className="space-y-1 text-blue-800 text-sm">
                          <li>• Process voice data and provide AI insights</li>
                          <li>• Maintain and improve service quality</li>
                          <li>• Provide customer support</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Business Operations:</h4>
                        <ul className="space-y-1 text-purple-800 text-sm">
                          <li>• Billing and payment processing</li>
                          <li>• Account management</li>
                          <li>• Legal compliance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security Measures */}
              <section id="security">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Security Measures</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We implement comprehensive security measures to protect your data from unauthorized access, 
                      alteration, disclosure, or destruction.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <Lock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-red-900 mb-1">Encryption</h4>
                        <p className="text-red-800 text-sm">AES-256 encryption for data at rest and in transit</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-blue-900 mb-1">Access Controls</h4>
                        <p className="text-blue-800 text-sm">Multi-factor authentication and role-based access</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-green-900 mb-1">Compliance</h4>
                        <p className="text-green-800 text-sm">SOC 2 Type II, ISO 27001, and GDPR compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Your Privacy Rights</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      You have several rights regarding your personal data. We respect these rights and provide 
                      easy ways for you to exercise them.
                    </p>
                    
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h4 className="font-semibold text-yellow-900 mb-3">Your Rights Include:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                        <div>
                          <strong>Right to Access:</strong> Request copies of your personal data
                        </div>
                        <div>
                          <strong>Right to Rectification:</strong> Correct inaccurate personal data
                        </div>
                        <div>
                          <strong>Right to Erasure:</strong> Request deletion of your personal data
                        </div>
                        <div>
                          <strong>Right to Portability:</strong> Receive your data in a structured format
                        </div>
                        <div>
                          <strong>Right to Object:</strong> Object to certain processing activities
                        </div>
                        <div>
                          <strong>Right to Restriction:</strong> Restrict processing in certain situations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* International Transfers */}
              <section id="international">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">6. International Data Transfers</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      When we transfer your data internationally, we ensure adequate protection through:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                      <li>• Adequacy decisions for transfers to countries with adequate protection</li>
                      <li>• Appropriate safeguards and security measures</li>
                      <li>• Regular assessments of transfer mechanisms</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-4">
                    If you have questions about this Privacy Policy or want to exercise your privacy rights, contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Data Protection Officer:</strong></p>
                      <p>Email: privacy@sonexa.ai</p>
                      <p>Phone: +1 (555) 123-4567</p>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Mailing Address:</strong></p>
                      <p>Sonexa AI Privacy Team</p>
                      <p>123 Innovation Drive</p>
                      <p>San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
