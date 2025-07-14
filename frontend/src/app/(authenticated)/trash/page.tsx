import { Trash2, RefreshCw, AlertTriangle, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TrashPage() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-red-500 p-2 rounded-lg">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-bold text-gray-900 text-3xl">Trash</h1>
              </div>
              <p className="text-gray-600">
                Manage your deleted files and messages
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 w-4 h-4" />
                Refresh
              </Button>
              <Button variant="destructive">
                <AlertTriangle className="mr-2 w-4 h-4" />
                Empty Trash
              </Button>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <Card className="bg-amber-50 mb-6 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">
                  Items in trash will be permanently deleted after 30 days
                </p>
                <p className="text-amber-700 text-sm">
                  You can restore items or delete them permanently
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trash Items */}
        <Card>
          <CardHeader>
            <CardTitle>Deleted Items</CardTitle>
            <CardDescription>
              Files and messages that have been moved to trash
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center hover:bg-gray-50 p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <FileX className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Deleted Item {item}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-gray-600 text-sm">
                          Deleted 2 days ago
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {item % 2 === 0 ? "Message" : "File"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-1 w-3 h-3" />
                      Restore
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-1 w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State Alternative */}
            {/* Uncomment this if you want to show empty state instead */}
            {/* 
            <div className="py-12 text-center">
              <div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 p-4 rounded-full w-16 h-16">
                <Trash2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Trash is empty</h3>
              <p className="text-gray-600">No deleted items to display</p>
            </div>
            */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
