import { Upload, Brain, BarChart3, Download } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-12 h-12" />,
    title: "Upload Voice",
    description:
      "Simply upload your voice messages or connect your communication channels",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "AI Processing",
    description:
      "Our multi-model AI analyzes and transcribes with Azure AI or OpenAI",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <BarChart3 className="w-12 h-12" />,
    title: "Get Insights",
    description:
      "Receive detailed analytics, sentiment analysis, and actionable insights",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <Download className="w-12 h-12" />,
    title: "Export & Share",
    description:
      "Download reports and share insights with your team seamlessly",
    color: "from-emerald-500 to-emerald-600",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative bg-slate-800/20 px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            How It
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              Works
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300 text-xl">
            Transform your voice data into valuable insights in just four simple
            steps
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block top-20 left-full z-0 absolute bg-gradient-to-r from-slate-600 to-transparent w-full h-0.5" />
              )}

              <div className="relative bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm p-8 border border-slate-700 hover:border-blue-500/50 rounded-2xl text-center group-hover:scale-105 transition-all duration-300">
                {/* Step Number */}
                <div className="-top-4 left-1/2 absolute flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-8 h-8 font-bold text-white text-sm -translate-x-1/2 transform">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{step.icon}</div>
                </div>

                <h3 className="mb-4 font-semibold text-white text-xl">
                  {step.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-slate-400">Ready to see it in action?</p>
          <div className="inline-flex bg-slate-800/50 backdrop-blur-sm p-2 border border-slate-600 rounded-full">
            <div className="flex items-center space-x-4 px-6 py-2">
              <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
              <span className="text-slate-300">Live demo available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
