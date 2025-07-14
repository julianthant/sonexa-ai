import { Metadata } from "next";
import { ArrowRight, Code, Book, Play, Download, Globe, Terminal, FileText, Zap, Shield, Database, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - Sonexa AI Voice Intelligence Platform",
  description: "Complete developer documentation, API references, and integration guides for Sonexa AI.",
};

const quickStartSteps = [
  {
    step: "1",
    title: "Get Your API Key",
    description: "Sign up and grab your API key from the dashboard",
    code: `curl -X GET "https://api.sonexa.ai/v1/auth" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    step: "2", 
    title: "Upload Audio",
    description: "Send your audio file for transcription",
    code: `curl -X POST "https://api.sonexa.ai/v1/transcribe" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "audio=@your-file.mp3"`
  },
  {
    step: "3",
    title: "Get Results",
    description: "Retrieve your transcription and analysis",
    code: `{
  "transcription": "Hello, this is a sample...",
  "sentiment": "positive",
  "confidence": 0.95
}`
  }
];

const sections = [
  {
    icon: Play,
    title: "Quick Start",
    description: "Get up and running with Sonexa AI in minutes",
    href: "#quick-start",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation with examples",
    href: "#api-reference", 
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Terminal,
    title: "SDKs & Libraries",
    description: "Official SDKs for popular programming languages",
    href: "#sdks",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Globe,
    title: "Webhooks",
    description: "Real-time notifications for your applications",
    href: "#webhooks",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Secure API access and authentication methods",
    href: "#authentication",
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: Database,
    title: "Rate Limits",
    description: "Understanding API limits and best practices",
    href: "#rate-limits",
    color: "from-pink-500 to-purple-600"
  }
];

const sdks = [
  {
    language: "Python",
    description: "Official Python SDK with asyncio support",
    installCommand: "pip install sonexa-ai",
    github: "https://github.com/sonexa-ai/python-sdk"
  },
  {
    language: "Node.js",
    description: "TypeScript-first SDK for Node.js applications", 
    installCommand: "npm install @sonexa/ai-sdk",
    github: "https://github.com/sonexa-ai/node-sdk"
  },
  {
    language: "Go",
    description: "High-performance Go SDK for enterprise applications",
    installCommand: "go get github.com/sonexa-ai/go-sdk",
    github: "https://github.com/sonexa-ai/go-sdk"
  },
  {
    language: "Java",
    description: "Enterprise-ready Java SDK with Spring Boot support",
    installCommand: "implementation 'com.sonexa:ai-sdk:1.0.0'",
    github: "https://github.com/sonexa-ai/java-sdk"
  }
];

const endpoints = [
  {
    method: "POST",
    endpoint: "/v1/transcribe",
    description: "Transcribe audio files to text",
    params: ["audio (file)", "language (optional)", "format (optional)"]
  },
  {
    method: "POST", 
    endpoint: "/v1/analyze",
    description: "Analyze voice sentiment and emotions",
    params: ["audio (file)", "features (array)", "callback_url (optional)"]
  },
  {
    method: "GET",
    endpoint: "/v1/jobs/{id}",
    description: "Get transcription job status and results",
    params: ["id (string)"]
  },
  {
    method: "POST",
    endpoint: "/v1/models/train",
    description: "Train custom voice models",
    params: ["training_data (file)", "model_name (string)", "config (object)"]
  }
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Book className="w-4 h-4 mr-2" />
            Developer Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Build with
            <span className="block">Sonexa AI</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Everything you need to integrate voice intelligence into your applications. 
            Complete API references, SDKs, and step-by-step guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Quick Start Guide
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download SDKs
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Developer Resources
            </h2>
            <p className="text-xl text-gray-600">
              Choose your path to get started with Sonexa AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section id="quick-start" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-gray-600">
              Get started with Sonexa AI in 3 simple steps
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">{step.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section id="api-reference" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              API Reference
            </h2>
            <p className="text-xl text-gray-600">
              Complete list of available endpoints and methods
            </p>
          </div>
          
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-900 ml-4">{endpoint.endpoint}</code>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Try it →
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{endpoint.description}</p>
                <div className="flex flex-wrap gap-2">
                  {endpoint.params.map((param, paramIndex) => (
                    <span key={paramIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section id="sdks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Official SDKs
            </h2>
            <p className="text-xl text-gray-600">
              Use our official SDKs to integrate faster
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {sdks.map((sdk, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{sdk.language}</h3>
                  <a href={sdk.github} className="text-blue-600 hover:text-blue-800">
                    GitHub →
                  </a>
                </div>
                <p className="text-gray-600 mb-4">{sdk.description}</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">{sdk.installCommand}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our developer community and support team are here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Join Discord Community
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
