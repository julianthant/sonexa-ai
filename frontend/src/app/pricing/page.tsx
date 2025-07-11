import { PricingPlans } from "@/components/subscription/PricingPlans";

export default function PricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-bold text-gray-900 text-2xl">Sonexa AI</h1>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Content */}
      <PricingPlans />
    </div>
  );
}
