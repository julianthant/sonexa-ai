import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  Users,
  Building2,
  Bell,
  Globe,
  Key,
  CreditCard,
} from "lucide-react";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Personal settings",
      items: [
        {
          icon: User,
          title: "Personal details",
          description:
            "Personal details, password, voice email, and your active sessions.",
          iconColor: "text-purple-600",
          href: "/settings/personal",
        },
        {
          icon: Bell,
          title: "Notification preferences",
          description:
            "Customize email, SMS, push, and voice notifications you receive.",
          iconColor: "text-blue-600",
          href: "/settings/notifications",
        },
        {
          icon: Shield,
          title: "Privacy & Security",
          description:
            "Manage privacy settings, data usage, and advanced security options.",
          iconColor: "text-red-600",
          href: "/settings/privacy",
        },
      ],
    },
    {
      title: "Account settings",
      items: [
        {
          icon: Building2,
          title: "Organization",
          description:
            "Organization details, invite codes, and member management.",
          iconColor: "text-blue-600",
          href: "/settings/organization",
        },
        {
          icon: Users,
          title: "Team and security",
          description: "Team members, roles, and security settings.",
          iconColor: "text-orange-600",
          href: "/settings/team",
        },
        {
          icon: CreditCard,
          title: "Your plans",
          description: "Manage how you pay for Sonexa AI services.",
          iconColor: "text-green-600",
          href: "/settings/plans",
        },
        {
          icon: CreditCard,
          title: "Payment",
          description:
            "Payment methods, billing information, and transaction history.",
          iconColor: "text-emerald-600",
          href: "/settings/payment",
        },
        {
          icon: Globe,
          title: "Regional settings",
          description: "Timezone and regional preferences.",
          iconColor: "text-indigo-600",
          href: "/settings/regional",
        },
      ],
    },
    {
      title: "Product settings",
      items: [
        {
          icon: Mail,
          title: "Email Integration",
          description:
            "Connect email services and manage voice message email integrations.",
          iconColor: "text-purple-600",
          href: "/settings/email",
        },
        {
          icon: Mail,
          title: "Voice Messages",
          description:
            "Voice message settings, transcription, and sharing preferences.",
          iconColor: "text-blue-600",
          href: "/settings/voice",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {settingsSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h2 className="font-bold text-gray-900 text-lg">{section.title}</h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group cursor-pointer"
                >
                  <div className="flex items-start space-x-3 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 font-medium text-purple-600 group-hover:text-purple-700 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
