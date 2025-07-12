import { MessageSquare, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VoiceMessagesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2 font-bold text-gray-900 text-3xl">
            Voice Messages
          </h1>
          <p className="text-gray-600">
            Manage and review your voice messages.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          New Message
        </Button>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Voice Message #{i}</CardTitle>
                <Badge variant="outline">New</Badge>
              </div>
              <CardDescription>
                Recorded 2 hours ago • 1:32 duration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    From: John Doe
                  </p>
                  <p className="text-gray-500 text-sm">To: Marketing Team</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  Play
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
