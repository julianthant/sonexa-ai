"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does Sonexa AI process voice messages?",
    answer:
      "We use advanced AI models including Azure Speech Services for basic processing and OpenAI for premium analysis. Your voice messages are transcribed, analyzed for sentiment, and converted into actionable insights while maintaining enterprise-grade security.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support all major audio formats including MP3, WAV, M4A, FLAC, and more. You can upload files directly or integrate with popular communication platforms for automatic processing.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We're SOC2 compliant with enterprise-grade security. Your data is encrypted in transit and at rest, never shared with third parties, and you maintain full control over your voice data and insights.",
  },
  {
    question: "Can I integrate Sonexa AI with existing tools?",
    answer:
      "Yes! We offer APIs and webhooks for seamless integration with your existing workflow. Connect with CRM systems, communication platforms, and business intelligence tools.",
  },
  {
    question: "What's the difference between Azure AI and OpenAI processing?",
    answer:
      "Azure AI provides reliable basic transcription and sentiment analysis, perfect for getting started. OpenAI processing offers advanced insights, emotion detection, and detailed analytics for premium intelligence needs.",
  },
  {
    question: "Do you offer custom solutions for enterprises?",
    answer:
      "Yes, our Enterprise plan includes custom AI models, dedicated support, advanced analytics, and tailored integrations. Contact our sales team to discuss your specific requirements.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-slate-800/20 px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Frequently Asked
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              Questions
            </span>
          </h2>
          <p className="text-slate-300 text-xl">
            Everything you need to know about Sonexa AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center hover:bg-slate-700/30 p-6 w-full text-left transition-colors"
              >
                <span className="pr-4 font-semibold text-white text-lg">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-slate-600 border-t">
                    <p className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-slate-400">
            Still have questions? We're here to help.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <a
              href="mailto:support@sonexa.ai"
              className="inline-flex justify-center items-center bg-blue-500/20 hover:bg-blue-500/30 px-6 py-3 border border-blue-500/30 rounded-xl text-blue-300 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center bg-slate-700/50 hover:bg-slate-700 px-6 py-3 border border-slate-600 rounded-xl text-slate-300 transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
