import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: 19.99,
    description: "Perfect for individuals and small teams",
    features: [
      "100 voice messages per month",
      "Azure Speech processing",
      "Email notifications",
      "Basic analytics",
      "99% SLA",
      "Email support",
    ],
    highlight: false,
    buttonText: "Start Basic",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Premium",
    price: 79.99,
    description: "For growing businesses that need power",
    features: [
      "1,000 voice messages per month",
      "Multi-Model AI processing",
      "Priority queue",
      "Advanced analytics",
      "Business intelligence",
      "Priority email support",
      "Custom integrations",
      "99.5% SLA",
    ],
    highlight: true,
    buttonText: "Go Premium",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    price: 299.99,
    description: "For enterprises requiring unlimited scale",
    features: [
      "Unlimited voice messages",
      "Custom AI pipeline",
      "Dedicated resources",
      "API access",
      "Custom email domain",
      "Dedicated manager",
      "Custom integrations",
      "SSO & SAML",
      "99.9% SLA",
      "24/7 phone support",
    ],
    highlight: false,
    buttonText: "Contact Sales",
    gradient: "from-emerald-500 to-teal-600",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative bg-slate-800/30 px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Choose Your
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              AI Power
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300 text-xl">
            Scale from personal use to enterprise deployment with transparent
            pricing
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.highlight
                  ? "bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/50 scale-105"
                  : "bg-slate-800/50 border-slate-700"
              } backdrop-blur-sm p-8 border rounded-2xl transition-all duration-300 hover:scale-105`}
            >
              {plan.highlight && (
                <div className="-top-4 left-1/2 absolute bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full font-medium text-white text-sm -translate-x-1/2 transform">
                  Most Popular
                </div>
              )}

              <div className="mb-8 text-center">
                <h3 className="mb-2 font-bold text-white text-2xl">
                  {plan.name}
                </h3>
                <p className="text-slate-300 text-sm">{plan.description}</p>
                <div className="mt-6">
                  <span className="font-bold text-white text-4xl">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/register">
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? `bg-gradient-to-r ${plan.gradient} hover:scale-105`
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  } transition-all duration-300`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
