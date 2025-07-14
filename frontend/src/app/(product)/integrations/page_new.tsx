import { Metadata } from "next";
import { ArrowRight, Puzzle, Github, Slack, Zap, Webhook, Chrome, Trello, Mail, Cloud, Database, Smartphone, Monitor, Calendar, Building, Users, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations - Sonexa AI Voice Intelligence Platform",
  description: "Connect Sonexa AI with your favorite tools and platforms. Over 100+ integrations available.",
};

const featuredIntegrations = [
  {
    icon: Slack,
    name: "Slack",
    description: "Send transcriptions and insights directly to Slack channels",
    category: "Communication",
    color: "from-purple-500 to-pink-600",
    popular: true
  },
  {
    icon: Building,
    name: "Salesforce",
    description: "Automatically log call summaries and insights to CRM",
    category: "CRM",
    color: "from-blue-500 to-cyan-600",
    popular: true
  },
  {
    icon: Monitor,
    name: "Microsoft Teams",
    description: "Integrate with Teams meetings and conversations",
    category: "Communication",
    color: "from-blue-600 to-purple-600",
    popular: true
  },
  {
    icon: Zap,
    name: "Zapier",
    description: "Connect with 5000+ apps through automation",
    category: "Automation",
    color: "from-orange-500 to-red-600",
    popular: false
  }
];

const allIntegrations = [
  {
    category: "Communication",
    integrations: [
      { name: "Slack", description: "Team messaging platform", icon: Slack },
      { name: "Microsoft Teams", description: "Video conferencing & chat", icon: Monitor },
      { name: "Discord", description: "Gaming and community chat", icon: Mail },
      { name: "Zoom", description: "Video conferencing platform", icon: Monitor },
      { name: "Google Meet", description: "Video meetings by Google", icon: Chrome },
    ]
  },
  {
    category: "CRM & Sales",
    integrations: [
      { name: "Salesforce", description: "Leading CRM platform", icon: Building },
      { name: "HubSpot", description: "Inbound marketing & sales", icon: Database },
      { name: "Pipedrive", description: "Sales pipeline management", icon: Database },
      { name: "Zendesk", description: "Customer support platform", icon: Mail },
      { name: "Intercom", description: "Customer messaging platform", icon: Mail },
    ]
  },
  {
    category: "Productivity",
    integrations: [
      { name: "Google Workspace", description: "Productivity suite by Google", icon: Chrome },
      { name: "Microsoft 365", description: "Office productivity suite", icon: Monitor },
      { name: "Notion", description: "All-in-one workspace", icon: Database },
      { name: "Trello", description: "Project management boards", icon: Trello },
      { name: "Asana", description: "Work management platform", icon: Calendar },
    ]
  },
  {
    category: "Storage & Cloud",
    integrations: [
      { name: "Dropbox", description: "Cloud file storage", icon: Cloud },
      { name: "Google Drive", description: "Cloud storage by Google", icon: Chrome },
      { name: "OneDrive", description: "Cloud storage by Microsoft", icon: Monitor },
      { name: "Box", description: "Enterprise cloud storage", icon: Cloud },
      { name: "AWS S3", description: "Amazon cloud storage", icon: Cloud },
    ]
  },
  {
    category: "Development",
    integrations: [
      { name: "GitHub", description: "Code repository hosting", icon: Github },
      { name: "GitLab", description: "DevOps platform", icon: Github },
      { name: "Jira", description: "Issue tracking & project management", icon: Database },
      { name: "Jenkins", description: "Automation server", icon: Zap },
      { name: "Docker", description: "Containerization platform", icon: Cloud },
    ]
  },
  {
    category: "Analytics & Business Intelligence",
    integrations: [
      { name: "Google Analytics", description: "Web analytics platform", icon: Chrome },
      { name: "Tableau", description: "Data visualization platform", icon: Database },
      { name: "Power BI", description: "Business analytics by Microsoft", icon: Monitor },
      { name: "Mixpanel", description: "Product analytics platform", icon: Database },
      { name: "Amplitude", description: "Digital analytics platform", icon: Database },
    ]
  }
];

const integrationBenefits = [
  {
    icon: Zap,
    title: "Seamless Workflow",
    description: "Automatically sync voice insights with your existing tools and processes"
  },
  {
    icon: Database,
    title: "Unified Data",
    description: "Centralize voice intelligence data across all your business platforms"
  },
  {
    icon: Smartphone,
    title: "Real-time Sync",
    description: "Get instant notifications and updates across all connected applications"
  },
  {
    icon: Cloud,
    title: "Cloud-first",
    description: "All integrations work seamlessly in the cloud with enterprise security"
  }
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Puzzle className="w-4 h-4 mr-2" />
            100+ Integrations Available
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Connect Everything
            <span className="block">with Sonexa AI</span>
          </h1>
          <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
            Seamlessly integrate voice intelligence into your existing workflow. 
            Connect with the tools you already use and love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Browse All Integrations
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center">
              <Webhook className="w-4 h-4 mr-2" />
              Custom Integration
            </button>
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Most popular integrations used by our customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredIntegrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative">
                  {integration.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium mb-3">
                    {integration.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h3>
                  <p className="text-gray-600 mb-4">{integration.description}</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                    Connect <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Integrations?
            </h2>
            <p className="text-xl text-gray-600">
              Maximize the value of your voice intelligence data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Browse our complete library of integrations
            </p>
          </div>
          
          <div className="space-y-12">
            {allIntegrations.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {category.integrations.map((integration, integrationIndex) => {
                    const IconComponent = integration.icon;
                    return (
                      <div key={integrationIndex} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Integration CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Integration?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Don't see your favorite tool? We can build custom integrations for enterprise customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Request Integration
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
              View API Docs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
