import {
  Headphones,
  MessageCircle,
  Users,
  Building2,
  Phone,
  Mic2,
} from "lucide-react";

const useCases = [
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Customer Support",
    description:
      "Analyze support calls for sentiment, extract action items, and improve service quality",
    benefits: ["Sentiment Analysis", "Quality Scoring", "Training Insights"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Sales Calls",
    description:
      "Transform sales conversations into actionable insights and follow-up strategies",
    benefits: ["Lead Scoring", "Objection Tracking", "Deal Intelligence"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Meetings",
    description:
      "Convert meeting recordings into summaries, action items, and decision logs",
    benefits: ["Meeting Summaries", "Action Items", "Decision Tracking"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Enterprise Compliance",
    description:
      "Ensure regulatory compliance with automated transcription and analysis",
    benefits: ["Compliance Monitoring", "Risk Assessment", "Audit Trails"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Interview Analysis",
    description:
      "Streamline hiring with AI-powered interview insights and candidate evaluation",
    benefits: ["Candidate Scoring", "Bias Detection", "Interview Quality"],
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: <Mic2 className="w-8 h-8" />,
    title: "Content Creation",
    description:
      "Transform voice notes and podcasts into written content and summaries",
    benefits: ["Content Generation", "SEO Optimization", "Multi-format Output"],
    gradient: "from-rose-500 to-pink-500",
  },
];

export function UseCasesSection() {
  return (
    <section className="relative px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Endless
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              Possibilities
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300 text-xl">
            From customer support to content creation, unlock the potential of
            voice data across industries
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/30 hover:bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-700 hover:border-blue-500/50 rounded-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${useCase.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{useCase.icon}</div>
              </div>

              <h3 className="mb-4 font-semibold text-white text-xl">
                {useCase.title}
              </h3>
              <p className="mb-6 text-slate-300 leading-relaxed">
                {useCase.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {useCase.benefits.map((benefit, benefitIndex) => (
                  <div
                    key={benefitIndex}
                    className="flex items-center space-x-2"
                  >
                    <div
                      className={`w-2 h-2 bg-gradient-to-r ${useCase.gradient} rounded-full`}
                    ></div>
                    <span className="text-slate-400 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 pt-16 border-slate-700 border-t">
          <div className="mb-12 text-center">
            <h3 className="mb-4 font-bold text-white text-2xl">
              Trusted Performance Metrics
            </h3>
            <p className="text-slate-300">
              Enterprise-grade reliability and accuracy
            </p>
          </div>

          <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-600 hover:border-blue-500/50 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:transform">
                <div className="mb-3 font-bold text-blue-400 text-4xl">95%</div>
                <div className="font-medium text-slate-300">Accuracy Rate</div>
                <div className="mt-2 text-slate-500 text-sm">
                  AI-powered precision
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-600 hover:border-purple-500/50 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:transform">
                <div className="mb-3 font-bold text-purple-400 text-4xl">
                  24/7
                </div>
                <div className="font-medium text-slate-300">Processing</div>
                <div className="mt-2 text-slate-500 text-sm">
                  Always available
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-600 hover:border-emerald-500/50 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:transform">
                <div className="mb-3 font-bold text-emerald-400 text-4xl">
                  100+
                </div>
                <div className="font-medium text-slate-300">Languages</div>
                <div className="mt-2 text-slate-500 text-sm">
                  Global support
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-600 hover:border-orange-500/50 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:transform">
                <div className="mb-3 font-bold text-orange-400 text-4xl">
                  SOC2
                </div>
                <div className="font-medium text-slate-300">Compliant</div>
                <div className="mt-2 text-slate-500 text-sm">
                  Enterprise security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
