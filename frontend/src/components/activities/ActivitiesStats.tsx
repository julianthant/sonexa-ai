import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, CheckCircle, Shield } from "lucide-react";

interface ActivitiesStatsProps {
  stats: {
    totalActivities: number;
    pendingVerifications: number;
    completedToday: number;
    securityEvents: number;
  };
}

export default function ActivitiesStats({ stats }: ActivitiesStatsProps) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Activities
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.totalActivities}
              </p>
              <p className="mt-1 text-blue-600 text-sm">All time</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Pending Verifications
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.pendingVerifications}
              </p>
              <p className="mt-1 text-orange-600 text-sm">Requires action</p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Completed Today
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.completedToday}
              </p>
              <p className="mt-1 text-green-600 text-sm">Today's progress</p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Security Events
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.securityEvents}
              </p>
              <p className="mt-1 text-red-600 text-sm">Security related</p>
            </div>
            <div className="flex justify-center items-center bg-red-100 rounded-lg w-12 h-12">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
