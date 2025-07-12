import Link from "next/link";
import {
  MessageSquare,
  Bell,
  Search,
  Mail,
  HelpCircle,
  Settings,
  Home,
  Upload,
  FileText,
  Users,
  Building2,
  BarChart3,
  Activity,
  Plus,
  Send,
  Download,
  Share2,
  Archive,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { SearchBar } from "../../components/layout/SearchBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarSections = [
    {
      title: "Main",
      items: [
        {
          id: "home",
          name: "Home",
          icon: Home,
          color: "bg-blue-500",
          href: "/home",
        },
        {
          id: "analytics",
          name: "Analytics",
          icon: BarChart3,
          color: "bg-amber-500",
          href: "/analytics",
        },
        {
          id: "activities",
          name: "Activity",
          icon: Activity,
          color: "bg-pink-500",
          count: 5,
          href: "/activities",
        },
      ],
    },
    {
      title: "Voice Messages",
      items: [
        {
          id: "create-message",
          name: "Create",
          icon: Plus,
          color: "bg-green-500",
          href: "/create-message",
        },
        {
          id: "voice-messages",
          name: "Messages",
          icon: MessageSquare,
          color: "bg-purple-500",
          count: 23,
          href: "/voice-messages",
        },
        {
          id: "send-message",
          name: "Send",
          icon: Send,
          color: "bg-blue-600",
          href: "/send-message",
        },
        {
          id: "share",
          name: "Share",
          icon: Share2,
          color: "bg-emerald-500",
          href: "/share",
        },
      ],
    },
    {
      title: "Files & Storage",
      items: [
        {
          id: "upload",
          name: "Upload",
          icon: Upload,
          color: "bg-orange-500",
          href: "/upload",
        },
        {
          id: "files",
          name: "Files",
          icon: FileText,
          color: "bg-cyan-500",
          count: 12,
          href: "/files",
        },
        {
          id: "downloads",
          name: "Downloads",
          icon: Download,
          color: "bg-violet-500",
          href: "/downloads",
        },
        {
          id: "archive",
          name: "Archive",
          icon: Archive,
          color: "bg-gray-500",
          href: "/archive",
        },
        {
          id: "favorites",
          name: "Favorites",
          icon: Star,
          color: "bg-yellow-500",
          href: "/favorites",
        },
        {
          id: "trash",
          name: "Trash",
          icon: Trash2,
          color: "bg-red-500",
          href: "/trash",
        },
      ],
    },
    {
      title: "Organization",
      items: [
        {
          id: "collaboration",
          name: "Teams",
          icon: Users,
          color: "bg-indigo-500",
          href: "/collaboration",
        },
        {
          id: "company",
          name: "Company",
          icon: Building2,
          color: "bg-slate-500",
          href: "/company",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Top Navbar */}
      <header className="top-0 right-0 left-0 z-50 fixed bg-white border-gray-200 border-b">
        <div className="flex items-center px-6 h-16">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-4 pr-6 w-80">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-8 h-8">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-xl">Sonexa AI</span>
            </Link>
          </div>

          {/* Center section - takes remaining space */}
          <div className="flex flex-1 justify-center items-center ml-32">
            <div className="flex justify-between items-center px-6 w-full max-w-7xl">
              {/* Center - Search */}
              <div className="flex-1 mr-8 max-w-xl">
                <SearchBar />
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center space-x-3">
                {/* Messages */}
                <Link href="/voice-messages">
                  <Button variant="ghost" size="sm">
                    <Mail className="w-5 h-5" />
                  </Button>
                </Link>

                {/* Notifications */}
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>

                {/* Help */}
                <Link href="/help">
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </Link>

                {/* Settings */}
                <Link href="/settings">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="top-16 left-0 z-30 fixed bg-white border-gray-200 border-r w-80 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Actions Header */}
          <div className="px-6 py-6">
            <h2 className="font-semibold text-gray-900 text-base">
              Navigation
            </h2>
            <p className="text-gray-600 text-xs">
              Choose an action to get started
            </p>
          </div>

          {/* Categorized Navigation */}
          <nav className="flex-1 space-y-6 px-3 py-2">
            {sidebarSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="px-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group flex justify-between items-center hover:bg-gray-50 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 text-sm transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.color}`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        {item.count && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-600 text-xs">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Support Section */}
          <div className="px-6 py-4 border-gray-200 border-t">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">
                    Need Help?
                  </h3>
                  <p className="mt-1 text-gray-600 text-xs">
                    Get support from our team
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-blue-50 mt-2 border-blue-200 h-7 text-blue-700 text-xs"
                  >
                    Get Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-16 pl-80">
        <div className="min-h-[calc(100vh-4rem)]">
          <div className="mx-auto px-6 py-6 max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
