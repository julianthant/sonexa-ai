import { Metadata } from "next";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Globe,
  Users,
  Headphones,
  Building,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - Sonexa AI Voice Intelligence Platform",
  description:
    "Get in touch with our team. We're here to help with your voice intelligence needs.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours",
    contact: "hello@sonexa.ai",
    availability: "24/7",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+1 (555) 123-4567",
    availability: "Mon-Fri 9AM-6PM PST",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support team",
    contact: "Start Chat",
    availability: "24/7 for Pro & Enterprise",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters in San Francisco",
    contact: "123 Innovation Drive, SF, CA 94105",
    availability: "By appointment",
  },
];

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Innovation Drive\nSan Francisco, CA 94105",
    type: "Headquarters",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "45 Tech Street\nLondon, EC1V 9BE",
    type: "European Office",
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "1-2-3 Tech District\nTokyo, 100-0001",
    type: "Asia Pacific Office",
  },
];

const departments = [
  {
    icon: Users,
    name: "Sales",
    description: "Questions about pricing and plans",
    email: "sales@sonexa.ai",
  },
  {
    icon: Headphones,
    name: "Support",
    description: "Technical help and troubleshooting",
    email: "support@sonexa.ai",
  },
  {
    icon: Building,
    name: "Partnerships",
    description: "Business partnerships and integrations",
    email: "partnerships@sonexa.ai",
  },
  {
    icon: Globe,
    name: "Media & Press",
    description: "Press inquiries and media relations",
    email: "press@sonexa.ai",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Back to Home Button */}
      <div className="top-4 left-4 z-10 absolute">
        <Link
          href="/"
          className="inline-flex items-center bg-white/80 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-4 py-2 rounded-full font-medium text-white text-sm">
            <MessageSquare className="mr-2 w-4 h-4" />
            We're Here to Help
          </div>
          <h1 className="mb-6 font-bold text-white text-5xl md:text-6xl">
            Get in Touch
            <span className="block">with Our Team</span>
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-blue-100 text-xl">
            Have questions about Sonexa AI? Want to see a demo? Our team is
            ready to help you discover how voice intelligence can transform your
            business.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Choose How to Reach Us
            </h2>
            <p className="text-gray-600 text-xl">
              Multiple ways to connect with our team
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl text-center transition-shadow"
                >
                  <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 rounded-lg w-12 h-12">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                    {method.title}
                  </h3>
                  <p className="mb-3 text-gray-600">{method.description}</p>
                  <p className="mb-2 font-medium text-blue-600">
                    {method.contact}
                  </p>
                  <p className="text-gray-500 text-sm">{method.availability}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Send Us a Message
            </h2>
            <p className="text-gray-600 text-xl">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-white shadow-xl p-8 rounded-2xl">
            <form className="space-y-6">
              <div className="gap-6 grid md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 font-medium text-gray-700 text-sm"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 font-medium text-gray-700 text-sm"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-700 text-sm"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 font-medium text-gray-700 text-sm"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 font-medium text-gray-700 text-sm"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option>General Inquiry</option>
                  <option>Sales Question</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Media Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium text-gray-700 text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="Tell us about your project and how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex justify-center items-center bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 px-8 py-4 rounded-lg w-full font-medium text-white transition-all duration-200"
              >
                <Send className="mr-2 w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Contact by Department
            </h2>
            <p className="text-gray-600 text-xl">
              Reach out to the right team for faster assistance
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <div
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow"
                >
                  <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 mb-4 rounded-lg w-10 h-10">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                    {dept.name}
                  </h3>
                  <p className="mb-3 text-gray-600">{dept.description}</p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {dept.email}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl">
              Our Global Offices
            </h2>
            <p className="text-gray-600 text-xl">
              Visit us at one of our worldwide locations
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-3">
            {offices.map((office, index) => (
              <div key={index} className="bg-white shadow-lg p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-600 text-sm">
                    {office.type}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                  {office.city}, {office.country}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-white text-3xl">
            Need Quick Answers?
          </h2>
          <p className="mb-8 text-blue-100 text-xl">
            Check out our help center for instant answers to common questions.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Link
              href="/help-center"
              className="bg-white hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-blue-600 transition-colors"
            >
              Visit Help Center
            </Link>
            <Link
              href="/documentation"
              className="hover:bg-white px-8 py-3 border-2 border-white rounded-lg font-medium text-white hover:text-blue-600 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
