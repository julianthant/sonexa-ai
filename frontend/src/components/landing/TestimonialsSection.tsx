import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Sonexa AI has revolutionized how we handle voice feedback. The AI insights are incredible and have helped us identify key customer pain points we never knew existed.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    metric: "40% faster insights",
  },
  {
    name: "Michael Rodriguez",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "The premium AI processing gives us the edge we need for customer intelligence. The sentiment analysis has transformed our customer service approach completely.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    metric: "95% accuracy rate",
  },
  {
    name: "Emily Johnson",
    role: "Operations Director",
    company: "GlobalCorp",
    content:
      "Enterprise features and security make this perfect for our compliance requirements. The integration was seamless and the support team is outstanding.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    metric: "SOC2 compliant",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative px-8 py-24">
      {" "}
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Trusted by
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
              {" "}
              Industry Leaders
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300 text-xl">
            See what our customers say about transforming their voice data
          </p>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-slate-700 border-t">
            <div className="text-center">
              <div className="font-bold text-white text-3xl">50M+</div>
              <div className="text-slate-400">Messages Processed</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-3xl">10K+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-3xl">99.9%</div>
              <div className="text-slate-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-3xl">4.9/5</div>
              <div className="text-slate-400">Customer Rating</div>
            </div>
          </div>
        </div>

        <div className="gap-8 grid md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-8 border border-slate-700 hover:border-blue-500/50 rounded-3xl hover:scale-105 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="top-6 right-6 absolute opacity-20">
                <Quote className="w-8 h-8 text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-current w-5 h-5 text-yellow-400"
                  />
                ))}
                <span className="ml-2 font-medium text-slate-400 text-sm">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Content */}
              <p className="mb-8 text-slate-300 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Metric Badge */}
              <div className="inline-flex items-center bg-blue-500/20 mb-6 px-4 py-2 border border-blue-500/30 rounded-full">
                <span className="font-medium text-blue-300 text-sm">
                  {testimonial.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="mr-4 border-2 border-slate-600 rounded-full w-14 h-14"
                />
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="font-medium text-blue-400 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
