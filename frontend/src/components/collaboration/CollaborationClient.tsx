"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Plus,
  Settings,
  MessageSquare,
  UserPlus,
  Crown,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  Download,
  Share2,
  MoreHorizontal,
} from "lucide-react";

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  color: string;
  role: "admin" | "member" | "viewer";
  lastActivity: string;
  avatar?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatar?: string;
  lastSeen: string;
  status: "online" | "offline" | "away";
}

export function CollaborationClient() {
  const [activeTab, setActiveTab] = useState("teams");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const teams: Team[] = [
    {
      id: "marketing",
      name: "Marketing Team",
      description: "Brand campaigns and content creation",
      memberCount: 8,
      color: "bg-blue-500",
      role: "admin",
      lastActivity: "2 hours ago",
    },
    {
      id: "sales",
      name: "Sales Team",
      description: "Customer acquisition and retention",
      memberCount: 12,
      color: "bg-green-500",
      role: "member",
      lastActivity: "30 minutes ago",
    },
    {
      id: "product",
      name: "Product Team",
      description: "Product development and strategy",
      memberCount: 6,
      color: "bg-purple-500",
      role: "member",
      lastActivity: "1 hour ago",
    },
    {
      id: "support",
      name: "Customer Support",
      description: "Customer service and technical support",
      memberCount: 15,
      color: "bg-orange-500",
      role: "viewer",
      lastActivity: "15 minutes ago",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "john",
      name: "John Smith",
      email: "john@company.com",
      role: "admin",
      lastSeen: "Online",
      status: "online",
    },
    {
      id: "sarah",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "member",
      lastSeen: "2 hours ago",
      status: "away",
    },
    {
      id: "mike",
      name: "Mike Davis",
      email: "mike@company.com",
      role: "member",
      lastSeen: "Online",
      status: "online",
    },
    {
      id: "lisa",
      name: "Lisa Chen",
      email: "lisa@company.com",
      role: "viewer",
      lastSeen: "1 day ago",
      status: "offline",
    },
  ];

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">Teams</h2>
          <p className="text-gray-600">
            Collaborate with your team members across different projects
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 w-4 h-4" />
          Create Team
        </Button>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${team.color} flex items-center justify-center`}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          team.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {team.role}
                      </Badge>
                      {team.role === "admin" && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium">{team.memberCount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Last Activity</span>
                  <span className="text-gray-900">{team.lastActivity}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="mr-2 w-4 h-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 w-4 h-4" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMembersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">Team Members</h2>
          <p className="text-gray-600">
            Manage team members and their permissions
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="mr-2 w-4 h-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
          <CardDescription>
            All team members across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center hover:bg-gray-50 p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        member.status === "online"
                          ? "bg-green-400"
                          : member.status === "away"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge
                      variant={
                        member.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {member.role}
                    </Badge>
                    <p className="mt-1 text-gray-500 text-xs">
                      {member.lastSeen}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">Projects</h2>
          <p className="text-gray-600">
            Collaborative projects and shared workspaces
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {[
          {
            name: "Q4 Marketing Campaign",
            description: "Holiday season marketing initiatives",
            team: "Marketing Team",
            progress: 75,
            dueDate: "Dec 15, 2024",
            members: 5,
          },
          {
            name: "Product Launch Prep",
            description: "Preparation for new product launch",
            team: "Product Team",
            progress: 45,
            dueDate: "Jan 30, 2025",
            members: 8,
          },
          {
            name: "Customer Onboarding",
            description: "Improving customer onboarding experience",
            team: "Support Team",
            progress: 90,
            dueDate: "Nov 30, 2024",
            members: 6,
          },
          {
            name: "Sales Training Program",
            description: "New sales methodology training",
            team: "Sales Team",
            progress: 30,
            dueDate: "Feb 15, 2025",
            members: 12,
          },
        ].map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant="outline">{project.progress}%</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Team</span>
                  <span className="font-medium">{project.team}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="text-gray-900">{project.dueDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium">{project.members}</span>
                </div>
                <div className="bg-gray-200 mt-3 rounded-full w-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="mr-2 w-4 h-4" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="mr-2 w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessagesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">Team Messages</h2>
          <p className="text-gray-600">
            Recent voice messages shared with teams
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <MessageSquare className="mr-2 w-4 h-4" />
          Send Message
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="mx-auto mb-4 w-12 h-12 text-gray-400" />
          <h3 className="mb-2 font-medium text-gray-900 text-lg">
            Team Communication
          </h3>
          <p className="mb-4 text-gray-500">
            Voice messages and team communications will appear here
          </p>
          <Button variant="outline">View All Messages</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">
          Team Collaboration
        </h1>
        <p className="text-gray-600">
          Work together with your teams on voice messages and projects.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="teams" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Teams</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Projects</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {renderTeamsTab()}
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          {renderMembersTab()}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {renderProjectsTab()}
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          {renderMessagesTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
