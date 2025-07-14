import { Metadata } from "next";
import { ArrowLeft, Database, Server, Shield, CheckCircle, Globe, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Processing Agreement - Sonexa AI Voice Intelligence Platform",
  description: "Data Processing Agreement for Sonexa AI. Learn about our data processing practices and commitments.",
};

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-purple-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Database className="w-4 h-4 mr-2" />
            Data Processing Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Data Processing
          </h1>
          <p className="text-xl text-purple-100 mb-4">
            How we process, protect, and manage your data with the highest standards
          </p>
          <div className="flex items-center justify-center text-purple-100">
            <Server className="w-4 h-4 mr-2" />
            Last updated: July 13, 2025
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Processing Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This Data Processing Agreement (DPA) outlines how Sonexa AI processes personal data 
              on behalf of our customers and partners. We are committed to maintaining the highest 
              standards of data protection and privacy.
            </p>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">Our Commitment</h3>
              <p className="text-purple-800 text-sm">
                We process data only as instructed by our customers and in accordance with applicable 
                data protection laws, including GDPR, CCPA, and other global privacy regulations.
              </p>
            </div>
          </section>

          {/* Processing Categories */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories of Data Processing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Voice Data Processing</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Audio file transcription</li>
                  <li>• Speech-to-text conversion</li>
                  <li>• Voice pattern analysis</li>
                  <li>• Sentiment detection</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">User Data Processing</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Account management</li>
                  <li>• Usage analytics</li>
                  <li>• Support interactions</li>
                  <li>• Billing information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security Measures */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical and Organizational Measures</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 text-red-600 mr-2" />
                  Technical Safeguards
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">Encryption</h4>
                    <p className="text-red-800 text-sm">AES-256 encryption for data at rest and TLS 1.3 for data in transit</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Access Controls</h4>
                    <p className="text-blue-800 text-sm">Multi-factor authentication and role-based access controls</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Monitoring</h4>
                    <p className="text-green-800 text-sm">24/7 security monitoring and threat detection systems</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 text-purple-600 mr-2" />
                  Organizational Measures
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Staff Training</h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Regular privacy training</li>
                        <li>• Security awareness programs</li>
                        <li>• Confidentiality agreements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Data Governance</h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Data retention policies</li>
                        <li>• Incident response procedures</li>
                        <li>• Regular compliance audits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Subject Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Subject Rights Support</h2>
            <p className="text-gray-600 mb-4">
              We provide tools and assistance to help our customers fulfill data subject rights requests:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Access to personal data",
                "Data rectification tools",
                "Data deletion capabilities",
                "Data portability features",
                "Processing restriction options",
                "Objection handling procedures"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Cross-Border Data Protection</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    When transferring data internationally, we ensure adequate protection through:
                  </p>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Standard Contractual Clauses (SCCs)</li>
                    <li>• Adequacy decisions</li>
                    <li>• Binding Corporate Rules</li>
                    <li>• Appropriate safeguards</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-processors */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sub-processors</h2>
            <p className="text-gray-600 mb-4">
              We may engage trusted sub-processors to help deliver our services. All sub-processors are:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Subject to data processing agreements</li>
                    <li>• Required to maintain equivalent protections</li>
                    <li>• Regularly audited for compliance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Transparency</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Current sub-processor list available</li>
                    <li>• 30-day notice for new sub-processors</li>
                    <li>• Customer objection rights</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Processing Questions</h2>
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-purple-800 mb-4">
                For questions about our data processing practices or to request a copy of our DPA:
              </p>
              <div className="space-y-2 text-purple-700">
                <p><strong>Email:</strong> dpa@sonexa.ai</p>
                <p><strong>Legal Team:</strong> legal@sonexa.ai</p>
                <p><strong>Privacy Team:</strong> privacy@sonexa.ai</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
