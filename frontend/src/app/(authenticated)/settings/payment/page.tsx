import Link from "next/link";
import {
  CreditCard,
  Plus,
  Calendar,
  DollarSign,
  Receipt,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function PaymentPage() {
  const tabs = [
    { id: "methods", name: "Payment Methods", active: true },
    { id: "billing", name: "Billing Info", active: false },
    { id: "history", name: "Transaction History", active: false },
    { id: "invoices", name: "Invoices", active: false },
  ];

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
          <h1 className="mb-1 font-bold text-gray-900 text-2xl">Payment</h1>
          <p className="text-gray-600 text-sm">
            Manage payment methods, billing information, and transaction history
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/settings/payment?tab=${tab.id}`}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                tab.active
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Payment Methods</h2>
          <Button>
            <Plus className="mr-2 w-4 h-4" />
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-3">
          {/* Primary Card */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">
                    •••• •••• •••• 4242
                  </h3>
                  <span className="bg-green-100 px-2 py-1 rounded text-green-800 text-xs">
                    Primary
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Visa • Expires 12/26</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>

          {/* Secondary Card */}
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-10 h-10">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  •••• •••• •••• 5555
                </h3>
                <p className="text-gray-600 text-sm">
                  Mastercard • Expires 08/25
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Set Primary
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Billing Information</h2>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Billing Address</h3>
                <div className="mt-1 text-gray-600 text-sm">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>San Francisco, CA 94102</p>
                  <p>United States</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Preferences */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Billing Preferences</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Auto-pay</h3>
              <p className="text-gray-600 text-sm">
                Automatically pay invoices when they're due
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Email receipts</h3>
              <p className="text-gray-600 text-sm">
                Send email receipts for all payments
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Usage alerts</h3>
              <p className="text-gray-600 text-sm">
                Get notified when approaching billing limits
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">
            Recent Transactions
          </h2>
          <Link
            href="/settings/payment/history"
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            View all transactions
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Voice Processing</h3>
                <p className="text-gray-600 text-sm">Jan 15, 2025 • 14:30</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$12.45</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Monthly Storage</h3>
                <p className="text-gray-600 text-sm">Jan 1, 2025 • 09:00</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$8.99</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-10 h-10">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Analytics Subscription
                </h3>
                <p className="text-gray-600 text-sm">Dec 28, 2024 • 12:00</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$19.99</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Tax Information</h2>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Tax ID</h3>
              <p className="text-gray-600 text-sm">
                Provide tax identification for compliance
              </p>
            </div>
            <Button variant="outline" size="sm">
              Add Tax ID
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
