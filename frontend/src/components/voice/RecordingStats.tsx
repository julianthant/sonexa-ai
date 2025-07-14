import { Card, CardContent } from "@/components/ui/card";
import { Mic, Clock, BarChart3, Calendar } from "lucide-react";

interface RecordingStatsProps {
  stats: {
    totalRecordings: number;
    totalDuration: string;
    averageLength: string;
    lastRecording: string | null;
  };
}

export default function RecordingStats({ stats }: RecordingStatsProps) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Recordings
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.totalRecordings}
              </p>
              <p className="mt-1 text-blue-600 text-sm">All time</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <Mic className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Duration
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.totalDuration}
              </p>
              <p className="mt-1 text-green-600 text-sm">Recording time</p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Average Length
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.averageLength}
              </p>
              <p className="mt-1 text-purple-600 text-sm">Per recording</p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Last Recording
              </p>
              <p className="font-bold text-gray-900 text-lg">
                {stats.lastRecording
                  ? new Date(stats.lastRecording).toLocaleDateString()
                  : "Never"}
              </p>
              <p className="mt-1 text-orange-600 text-sm">Most recent</p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
