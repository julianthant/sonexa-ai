import { Metadata } from "next";
import { Shield, Lock, Eye, Server, Award, FileCheck, Users, Globe, Key, AlertTriangle, CheckCircle, Database, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security - Sonexa AI Voice Intelligence Platform",
  description: "Enterprise-grade security and compliance. SOC 2 certified with military-grade encryption and zero-trust architecture.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest using military-grade AES-256 encryption",
    color: "from-red-500 to-pink-600"
  },
  {
    icon: Shield,
    title: "SOC 2 Type II Certified",
    description: "Independently audited security controls and processes following industry standards",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Eye,
    title: "Zero Trust Architecture",
    description: "Never trust, always verify approach with continuous security monitoring",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Enterprise-grade AWS infrastructure with 99.99% uptime SLA",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Key,
    title: "Advanced Authentication",
    description: "Multi-factor authentication and single sign-on (SSO) support",
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: Database,
    title: "Data Residency",
    description: "Choose where your data is stored and processed globally",
    color: "from-teal-500 to-blue-600"
  }
];

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Security, Availability, and Confidentiality",
    status: "Certified",
    icon: Award
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    status: "In Progress",
    icon: FileCheck
  },
  {
    name: "GDPR",
    description: "European Data Protection Regulation",
    status: "Compliant",
    icon: Users
  },
  {
    name: "CCPA",
    description: "California Consumer Privacy Act",
    status: "Compliant",
    icon: Globe
  }
];

const securityPractices = [
  {
    category: "Data Protection",
    practices: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for data in transit",
      "Encrypted database backups",
      "Secure key management with AWS KMS",
      "Data anonymization and pseudonymization"
    ]
  },
  {
    category: "Access Control",
    practices: [
      "Multi-factor authentication (MFA)",
      "Role-based access control (RBAC)",
      "Single sign-on (SSO) integration",
      "Regular access reviews and audits",
      "Privileged access management"
    ]
  },
  {
    category: "Infrastructure Security",
    practices: [
      "Private network isolation",
      "DDoS protection and mitigation",
      "Intrusion detection and prevention",
      "Regular vulnerability assessments",
      "Automated security patching"
    ]
  },
  {
    category: "Monitoring & Compliance",
    practices: [
      "24/7 security monitoring",
      "Real-time threat detection",
      "Audit logs and compliance reporting",
      "Regular penetration testing",
      "Incident response procedures"
    ]
  }
];

const trustIndicators = [
  {
    metric: "99.99%",
    label: "Uptime SLA",
    description: "Guaranteed availability"
  },
  {
    metric: "< 100ms",
    label: "Response Time",
    description: "Average API latency"
  },
  {
    metric: "100%",
    label: "Data Recovery",
    description: "Backup success rate"
  },
  {
    metric: "24/7",
    label: "Security Monitoring",
    description: "Round-the-clock protection"
  }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-600 transition-colors shadow-lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-Grade Security
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Data is
            <span className="block">Always Protected</span>
          </h1>
          <p className="text-xl text-red-100 mb-12 max-w-3xl mx-auto">
            Military-grade encryption, zero-trust architecture, and SOC 2 compliance ensure 
            your voice data remains secure and private at all times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
              <FileCheck className="w-4 h-4 mr-2" />
              View Security Report
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors inline-flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Compliance Documents
            </button>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multi-Layer Security
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive protection at every level of our infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trust by the Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to reliability and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{indicator.metric}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{indicator.label}</div>
                <div className="text-gray-600">{indicator.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600">
              Independently verified security and privacy standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 mb-3">{cert.description}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    cert.status === 'Certified' || cert.status === 'Compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cert.status === 'Certified' || cert.status === 'Compliant' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    )}
                    {cert.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Security Practices
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive security measures across all aspects of our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Security Questions or Concerns?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Our security team is here to help. Contact us for security inquiries, 
            vulnerability reports, or compliance documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Security Team
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors">
              Report Vulnerability
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
