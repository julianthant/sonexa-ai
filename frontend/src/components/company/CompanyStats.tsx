import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Briefcase, Clock } from "lucide-react";

interface CompanyStatsProps {
  stats: {
    totalEmployees: number;
    departments: number;
    activeProjects: number;
    lastUpdated: string;
  };
}

export default function CompanyStats({ stats }: CompanyStatsProps) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Employees
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.totalEmployees}
              </p>
              <p className="mt-1 text-blue-600 text-sm">Company size</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Departments
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.departments}
              </p>
              <p className="mt-1 text-green-600 text-sm">
                Organizational units
              </p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Active Projects
              </p>
              <p className="font-bold text-gray-900 text-3xl">
                {stats.activeProjects}
              </p>
              <p className="mt-1 text-purple-600 text-sm">In progress</p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Last Updated
              </p>
              <p className="font-bold text-gray-900 text-lg">
                {new Date(stats.lastUpdated).toLocaleDateString()}
              </p>
              <p className="mt-1 text-orange-600 text-sm">Profile updated</p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
