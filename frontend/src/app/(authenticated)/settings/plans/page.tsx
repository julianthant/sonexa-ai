import Link from "next/link";
import { CreditCard, Zap, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/settings"
            className="text-purple-600 hover:text-purple-700"
          >
            Settings
          </Link>
          <span className="text-gray-400">›</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="mb-1 font-bold text-gray-900 text-2xl">Your plans</h1>
        </div>
      </div>

      {/* Voice Processing */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Voice Processing</h2>

        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    AI Voice Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered voice message transcription and processing
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-1 font-medium text-gray-900 text-sm">
                    Standard processing
                  </div>
                  <div className="mb-2 font-semibold text-gray-900 text-xl">
                    $0.05 + 2¢ per minute
                  </div>
                  <div className="text-gray-600 text-sm">
                    Rates vary depending on voice quality and length.{" "}
                    <Link
                      href="#"
                      className="font-medium text-purple-600 hover:text-purple-700"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Storage</h2>

        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    Cloud Storage
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Store and manage your voice messages and transcriptions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage plan
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-1 font-medium text-gray-900 text-sm">
                    Pay as you go
                  </div>
                  <div className="mb-2 font-semibold text-gray-900 text-xl">
                    0.5% of storage volume
                  </div>
                  <div className="text-gray-600 text-sm">
                    Simple per-GB pricing with no minimum commitment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Analytics</h2>

        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Advanced analytics and insights for your voice messages
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage plan
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-1 font-medium text-gray-900 text-sm">
                    Analytics Starter
                  </div>
                  <div className="mb-2 font-semibold text-gray-900 text-xl">
                    0.3% on voice message analytics
                  </div>
                  <div className="text-gray-600 text-sm">
                    Comprehensive insights and reporting dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View all pricing */}
      <div className="pt-4">
        <Link
          href="#"
          className="text-purple-600 hover:text-purple-700 text-sm"
        >
          View pricing for all features
        </Link>
      </div>

      {/* Review costs section */}
      <div className="pt-8 border-t">
        <div className="space-y-3">
          <h2 className="font-bold text-gray-900 text-lg">
            Review your Sonexa AI costs
          </h2>
          <p className="text-gray-600 text-sm">
            See fees associated with your account, including transactions, voice
            processing, storage, usage, pricing plan, and more.
          </p>
          <Link
            href="#"
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            View usage history
          </Link>
        </div>
      </div>
    </div>
  );
}
