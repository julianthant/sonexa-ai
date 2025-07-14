import { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Voice Message - Sonexa AI",
  description: "Record and send a new voice message to your teams.",
};

export default function CreateMessagePage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">
          Create Voice Message
        </h1>
        <p className="text-gray-600">
          Record and send a new voice message to your teams.
        </p>
      </div>

      {/* Recording Stats - Server Side */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Recordings
              </p>
              <p className="font-bold text-gray-900 text-3xl">0</p>
              <p className="mt-1 text-blue-600 text-sm">All time</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          </div>
        </div>
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
