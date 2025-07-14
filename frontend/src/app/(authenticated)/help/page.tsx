import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpSearchBar } from "@/components/help/HelpSearchBar";
import {
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Users,
  Settings,
} from "lucide-react";

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      color: "bg-blue-100 text-blue-600",
      href: "/help/docs",
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users and get answers",
      color: "bg-green-100 text-green-600",
      href: "/help/forum",
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Get help from our support team",
      color: "bg-purple-100 text-purple-600",
      href: "/help/contact",
    },
    {
      icon: Phone,
      title: "Voice Messages Guide",
      description: "Learn how to use voice messages effectively",
      color: "bg-orange-100 text-orange-600",
      href: "/help/voice-guide",
    },
    {
      icon: FileText,
      title: "FAQ",
      description: "Frequently asked questions and answers",
      color: "bg-cyan-100 text-cyan-600",
      href: "/help/faq",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Managing teams and collaboration features",
      color: "bg-pink-100 text-pink-600",
      href: "/help/teams",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Configure your account and preferences",
      color: "bg-amber-100 text-amber-600",
      href: "/help/account",
    },
  ];

  const quickLinks = [
    "Getting Started with Voice AI",
    "Setting up your first voice message",
    "Managing team permissions",
    "API Integration Guide",
    "Billing and Subscription",
    "Data Privacy and Security",
    "Troubleshooting Common Issues",
    "Advanced Voice Features",
  ];

  return (
    <div className="mx-auto p-6 max-w-6xl">
      {/* Search Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-gray-900 text-4xl">
          How can we help you?
        </h1>
        <p className="mb-8 text-gray-600 text-xl">
          Search our knowledge base or browse categories below
        </p>

        <HelpSearchBar />
      </div>

      {/* Help Categories */}
      <div className="mb-12">
        <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
          Browse by Category
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
          Popular Articles
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {quickLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start p-4 h-auto text-left"
            >
              <div>
                <div className="font-medium">{link}</div>
                <div className="mt-1 text-gray-500 text-sm">Learn more →</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h2 className="mb-4 font-semibold text-gray-900 text-2xl">
            Still need help?
          </h2>
          <p className="mb-6 text-gray-600">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>
              <Mail className="mr-2 w-4 h-4" />
              Contact Support
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 w-4 h-4" />
              Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
