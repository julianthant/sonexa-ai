import { Mic, Brain, Zap, Shield, Globe, Star } from "lucide-react";

const features = [
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Voice to Intelligence",
    description:
      "Transform voice messages into actionable insights with AI-powered transcription and analysis",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Multi-Model AI",
    description:
      "Choose between Azure AI for basic processing or OpenAI for premium intelligence",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description:
      "Process voice messages in seconds with our optimized AI pipeline",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security for your sensitive voice data",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Scale",
    description: "Available worldwide with Azure cloud infrastructure",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Smart Analytics",
    description:
      "Advanced insights and analytics from your voice message patterns",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Powerful Features for
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              Modern Teams
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300 text-xl">
            Everything you need to transform voice data into business
            intelligence
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm p-8 border border-slate-700 hover:border-blue-500/50 rounded-2xl transition-all duration-300"
            >
              <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 mb-6 rounded-xl w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="mb-4 font-semibold text-white text-xl">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
