"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
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
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarAction {
  id: string;
  name: string;
  icon: any;
  color: string;
  count?: number;
  href: string;
}

export function AppSidebar() {
  const pathname = usePathname();

  const sidebarActions: SidebarAction[] = [
    {
      id: "home",
      name: "Home",
      icon: Home,
      color: "bg-blue-500",
      href: "/dashboard",
    },
    {
      id: "create-message",
      name: "Create",
      icon: Plus,
      color: "bg-green-500",
      href: "/dashboard/create-message",
    },
    {
      id: "voice-messages",
      name: "Messages",
      icon: MessageSquare,
      color: "bg-purple-500",
      count: 23,
      href: "/dashboard/voice-messages",
    },
    {
      id: "upload",
      name: "Upload",
      icon: Upload,
      color: "bg-orange-500",
      href: "/dashboard/upload",
    },
    {
      id: "files",
      name: "Files",
      icon: FileText,
      color: "bg-cyan-500",
      count: 12,
      href: "/dashboard/files",
    },
    {
      id: "collaboration",
      name: "Teams",
      icon: Users,
      color: "bg-indigo-500",
      href: "/dashboard/collaboration",
    },
    {
      id: "company",
      name: "Company",
      icon: Building2,
      color: "bg-slate-500",
      href: "/dashboard/company",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      color: "bg-amber-500",
      href: "/dashboard/analytics",
    },
    {
      id: "activities",
      name: "Activity",
      icon: Activity,
      color: "bg-pink-500",
      count: 5,
      href: "/dashboard/activities",
    },
    {
      id: "send-message",
      name: "Send",
      icon: Send,
      color: "bg-blue-600",
      href: "/dashboard/send-message",
    },
    {
      id: "share",
      name: "Share",
      icon: Share2,
      color: "bg-emerald-500",
      href: "/dashboard/share",
    },
    {
      id: "downloads",
      name: "Downloads",
      icon: Download,
      color: "bg-violet-500",
      href: "/dashboard/downloads",
    },
    {
      id: "archive",
      name: "Archive",
      icon: Archive,
      color: "bg-gray-500",
      href: "/dashboard/archive",
    },
    {
      id: "favorites",
      name: "Favorites",
      icon: Star,
      color: "bg-yellow-500",
      href: "/dashboard/favorites",
    },
    {
      id: "trash",
      name: "Trash",
      icon: Trash2,
      color: "bg-red-500",
      href: "/dashboard/trash",
    },
  ];

  return (
    <aside className="top-16 left-0 z-30 fixed bg-white border-gray-200 border-r w-80 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Actions Header */}
        <div className="px-4 py-6">
          <h2 className="font-semibold text-gray-900 text-base">Actions</h2>
          <p className="text-gray-600 text-xs">
            Choose an action to get started
          </p>
        </div>

        {/* Actions List */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {sidebarActions.map((action) => {
            const active =
              action.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(action.href);

            return (
              <Link
                key={action.id}
                href={action.href}
                className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-blue-50 text-blue-700 border-blue-200 border"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      active ? "bg-blue-100" : action.color
                    }`}
                  >
                    <action.icon
                      className={`w-4 h-4 ${
                        active ? "text-blue-600" : "text-white"
                      }`}
                    />
                  </div>
                  <span>{action.name}</span>
                </div>
                {action.count && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-600 text-xs">
                    {action.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Support Section */}
        <div className="px-4 py-4 border-gray-200 border-t">
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
  );
}
