import { Card, CardContent } from "@/components/ui/card";
import { Upload, HardDrive, Calendar, Database } from "lucide-react";

interface UploadStatsProps {
  stats: {
    totalFiles: number;
    storageUsed: string;
    uploadedToday: number;
    remainingStorage: string;
  };
}

export default function UploadStats({ stats }: UploadStatsProps) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Files
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.totalFiles}
              </p>
              <p className="mt-1 text-blue-600 text-sm">All uploads</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Storage Used
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.storageUsed}
              </p>
              <p className="mt-1 text-orange-600 text-sm">Current usage</p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <HardDrive className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Uploaded Today
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.uploadedToday}
              </p>
              <p className="mt-1 text-green-600 text-sm">Today's uploads</p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Remaining Storage
              </p>
              <p className="font-bold text-gray-900 text-2xl">
                {stats.remainingStorage}
              </p>
              <p className="mt-1 text-purple-600 text-sm">Available space</p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
