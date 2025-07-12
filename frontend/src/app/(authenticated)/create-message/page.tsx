import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreateMessagePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">
          Create Voice Message
        </h1>
        <p className="text-gray-600">
          Record and send a new voice message to your teams.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Voice Message</CardTitle>
          <CardDescription>
            Record your message and select recipients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center py-12 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="text-center">
              <MessageSquare className="mx-auto mb-4 w-12 h-12 text-gray-400" />
              <h3 className="mb-2 font-medium text-gray-900 text-lg">
                Ready to Record
              </h3>
              <p className="mb-4 text-gray-500">
                Click the button below to start recording your voice message
              </p>
              <Button size="lg" className="bg-red-500 hover:bg-red-600">
                <div className="bg-white mr-2 rounded-full w-3 h-3"></div>
                Start Recording
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
