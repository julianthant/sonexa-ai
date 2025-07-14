import {
  MessageSquare,
  Twitter,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API Documentation", href: "/documentation" },
    { name: "Integrations", href: "/integrations" },
    { name: "Security", href: "/security" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press-kit" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Help Center", href: "/help-center" },
    { name: "Community", href: "/community" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Data Processing", href: "/data-processing" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-slate-900 border-slate-800 border-t">
      <div className="mx-auto px-8 max-w-[1400px]">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="gap-12 grid lg:grid-cols-5">
            {/* Brand Column */}
            <div className="space-y-8 lg:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-12 h-12">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-2xl">Sonexa AI</h3>
                  <p className="text-blue-400 text-sm">
                    Voice Intelligence Platform
                  </p>
                </div>
              </div>

              <p className="max-w-md text-slate-300 text-lg leading-relaxed">
                Transform your voice data into actionable intelligence with our
                AI-powered platform. Trusted by 10,000+ companies worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-slate-400">
                  <Mail className="mr-3 w-5 h-5" />
                  <span>hello@sonexa.ai</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Phone className="mr-3 w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <MapPin className="mr-3 w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
              <div>
                <h4 className="mb-6 font-semibold text-white text-lg">
                  Product
                </h4>
                <ul className="space-y-4">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 font-semibold text-white text-lg">
                  Company
                </h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 font-semibold text-white text-lg">
                  Resources
                </h4>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-12 border-slate-800 border-t">
          <div className="items-center gap-8 grid lg:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-white text-xl">
                Stay Updated
              </h4>
              <p className="text-slate-400">
                Get the latest updates on AI voice intelligence and product
                news.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800 px-4 py-3 border border-slate-600 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
              />
              <button className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-slate-800 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 Sonexa AI. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
