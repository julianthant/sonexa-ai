import { Share2, Link2, Users, Mail, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SharePage() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-gray-900 text-3xl">Share</h1>
          </div>
          <p className="text-gray-600">
            Share your content and collaborate with others
          </p>
        </div>

        {/* Share Options Grid */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link2 className="w-5 h-5 text-blue-600" />
                <span>Share Link</span>
              </CardTitle>
              <CardDescription>
                Generate a shareable link for your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Generate Link</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>Team Share</span>
              </CardTitle>
              <CardDescription>
                Share with specific team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Select Team
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <span>Email Share</span>
              </CardTitle>
              <CardDescription>Send content via email</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Shares */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Shares</CardTitle>
            <CardDescription>
              Your recently shared content and collaborations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center hover:bg-gray-50 p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Copy className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Shared Content {item}</h4>
                      <p className="text-gray-600 text-sm">
                        Shared with team • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
