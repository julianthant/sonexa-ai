import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SendMessagePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Send Message</h1>
        <p className="text-gray-600">
          Quickly send a voice message to team members.
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Select Recipients
              </label>
              <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                {[
                  "Marketing Team",
                  "Sales Team",
                  "Support Team",
                  "Product Team",
                ].map((team) => (
                  <div
                    key={team}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-3 border rounded-lg cursor-pointer"
                  >
                    <input type="checkbox" className="rounded" />
                    <span className="font-medium">{team}</span>
                    <Badge variant="outline" className="ml-auto">
                      8 members
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full">
              <Send className="mr-2 w-4 h-4" />
              Send to Selected Teams
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
