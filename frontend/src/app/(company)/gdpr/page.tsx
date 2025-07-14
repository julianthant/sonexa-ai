import { Metadata } from "next";
import { ArrowLeft, Shield, Globe, Users, CheckCircle, Database } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GDPR Compliance - Sonexa AI Voice Intelligence Platform",
  description: "GDPR compliance information for Sonexa AI. Learn about our commitment to European data protection regulations.",
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            European Data Protection
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            GDPR Compliance
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Our commitment to protecting your rights under European data protection law
          </p>
          <div className="flex items-center justify-center text-blue-100">
            <Globe className="w-4 h-4 mr-2" />
            Compliant since May 25, 2018
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* GDPR Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is GDPR?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law 
              that came into effect on May 25, 2018. It strengthens data protection for individuals 
              within the European Union and addresses the export of personal data outside the EU.
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Sonexa AI's GDPR Commitment</h3>
              <p className="text-blue-800 text-sm">
                We are committed to ensuring full compliance with GDPR requirements and protecting 
                the privacy rights of all individuals whose personal data we process.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under GDPR</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right to be Informed</h3>
                </div>
                <p className="text-gray-600 text-sm">Clear information about how we collect and use your data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right of Access</h3>
                </div>
                <p className="text-gray-600 text-sm">Request copies of your personal data we hold</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right to Rectification</h3>
                </div>
                <p className="text-gray-600 text-sm">Correct inaccurate or incomplete data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right to Erasure</h3>
                </div>
                <p className="text-gray-600 text-sm">Request deletion of your personal data (right to be forgotten)</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right to Restrict Processing</h3>
                </div>
                <p className="text-gray-600 text-sm">Limit how we process your data in certain circumstances</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Right to Data Portability</h3>
                </div>
                <p className="text-gray-600 text-sm">Receive your data in a structured, machine-readable format</p>
              </div>
            </div>
          </section>

          {/* How We Protect Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Protect Your Data</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Data Minimization</h3>
                  <p className="text-gray-600 text-sm">We only collect and process data that is necessary for our services</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Security by Design</h3>
                  <p className="text-gray-600 text-sm">Privacy and security considerations are built into our systems from the ground up</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Staff Training</h3>
                  <p className="text-gray-600 text-sm">Regular GDPR training for all employees handling personal data</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Basis for Processing</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">We process your personal data based on the following legal grounds:</p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Consent:</strong> When you've given clear consent for specific processing activities</li>
                <li><strong>Contract:</strong> When processing is necessary to fulfill our contract with you</li>
                <li><strong>Legal Obligation:</strong> When we must process data to comply with legal requirements</li>
                <li><strong>Legitimate Interest:</strong> When we have a legitimate business interest that doesn't override your rights</li>
              </ul>
            </div>
          </section>

          {/* Contact DPO */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Data Protection Officer</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800 mb-4">
                For GDPR-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="space-y-2 text-blue-700">
                <p><strong>Email:</strong> dpo@sonexa.ai</p>
                <p><strong>Response Time:</strong> Within 30 days as required by GDPR</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
