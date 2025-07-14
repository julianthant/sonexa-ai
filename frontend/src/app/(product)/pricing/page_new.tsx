import { Metadata } from "next";
import { Check, X, Star, Zap, Users, Crown, ArrowRight, MessageSquare, BarChart3, Globe, Shield, Clock, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Sonexa AI Voice Intelligence Platform",
  description: "Transparent pricing that scales with your business. Start free and upgrade as you grow.",
};

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals and small projects",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      { name: "5 hours of transcription/month", included: true },
      { name: "Basic voice analysis", included: true },
      { name: "2 team members", included: true },
      { name: "Community support", included: true },
      { name: "Standard integrations", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom AI models", included: false },
      { name: "Priority support", included: false },
      { name: "SSO integration", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
    gradient: "from-gray-400 to-gray-600",
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    price: "$49",
    period: "per month",
    icon: Users,
    features: [
      { name: "50 hours of transcription/month", included: true },
      { name: "Advanced voice analytics", included: true },
      { name: "10 team members", included: true },
      { name: "Priority email support", included: true },
      { name: "All integrations", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Real-time processing", included: true },
      { name: "Custom AI models", included: false },
      { name: "SSO integration", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    period: "",
    icon: Crown,
    features: [
      { name: "Unlimited transcription", included: true },
      { name: "Custom AI model training", included: true },
      { name: "Unlimited team members", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Real-time processing", included: true },
      { name: "Custom AI models", included: true },
      { name: "SSO integration", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-600 to-pink-600",
  },
];

const features = [
  {
    icon: MessageSquare,
    title: "Voice Transcription",
    description: "Industry-leading accuracy with support for 50+ languages",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights and reporting for all your voice data",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Servers worldwide for low-latency processing",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption",
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "What happens if I exceed my monthly limits?",
    answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional hours.",
  },
  {
    question: "Do you offer custom pricing for large volumes?",
    answer: "Yes, we offer custom enterprise pricing for organizations with high-volume needs. Contact our sales team.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Transparent Pricing • No Hidden Fees
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple pricing that
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              scales with you
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Start free and upgrade as your business grows. All plans include our core voice intelligence features 
            with transparent pricing and no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                    plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${plan.gradient} mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need for voice intelligence
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Powerful features included in all plans
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We have answers.
            </p>
          </div>
          
          <div className="grid gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Sonexa AI for voice intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
