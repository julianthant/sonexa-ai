import { Metadata } from "next";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, Activity, Server, Database, Shield, Wifi } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "System Status | Sonexa AI",
  description: "Real-time status of Sonexa AI services, uptime monitoring, and incident reports.",
};

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Back to Home Button */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Activity className="w-4 h-4 mr-2" />
              All Systems Operational
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              System Status
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Real-time status of Sonexa AI services and infrastructure. We're committed to transparency and keeping you informed.
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Overall Status</h2>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span className="font-semibold">All Systems Operational</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.98%</div>
                <div className="text-slate-600">Uptime This Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">45ms</div>
                <div className="text-slate-600">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                <div className="text-slate-600">Active Incidents</div>
              </div>
            </div>
          </div>

          {/* Service Status */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Status</h2>
            <div className="space-y-4">
              {/* API Service */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Server className="w-6 h-6 text-slate-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Voice Analytics API</h3>
                    <p className="text-sm text-slate-600">Core voice processing and analysis</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Operational</span>
                </div>
              </div>

              {/* Dashboard */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Activity className="w-6 h-6 text-slate-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Web Dashboard</h3>
                    <p className="text-sm text-slate-600">User interface and management portal</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Operational</span>
                </div>
              </div>

              {/* Database */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Database className="w-6 h-6 text-slate-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Database Services</h3>
                    <p className="text-sm text-slate-600">Data storage and retrieval systems</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Operational</span>
                </div>
              </div>

              {/* Authentication */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-slate-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Authentication</h3>
                    <p className="text-sm text-slate-600">User login and security services</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Operational</span>
                </div>
              </div>

              {/* File Processing */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Wifi className="w-6 h-6 text-slate-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-slate-900">File Processing</h3>
                    <p className="text-sm text-slate-600">Audio upload and processing pipeline</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-4">API Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Average</span>
                    <span className="font-medium text-slate-900">45ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">95th Percentile</span>
                    <span className="font-medium text-slate-900">120ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">99th Percentile</span>
                    <span className="font-medium text-slate-900">250ms</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Uptime Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last 24 Hours</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last 7 Days</span>
                    <span className="font-medium text-green-600">99.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last 30 Days</span>
                    <span className="font-medium text-green-600">99.98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {/* No current incidents */}
              <div className="text-center py-12 text-slate-500">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Recent Incidents</h3>
                <p>All systems have been running smoothly. Last incident was resolved 15 days ago.</p>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Scheduled Maintenance</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-blue-900">Upcoming Maintenance</h3>
              </div>
              <div className="space-y-2">
                <p className="text-blue-800">
                  <span className="font-medium">Database Optimization</span> - January 15, 2024
                </p>
                <p className="text-blue-700 text-sm">
                  Scheduled for 2:00 AM - 4:00 AM EST. Expected downtime: 15 minutes maximum.
                </p>
                <p className="text-blue-700 text-sm">
                  This maintenance will improve query performance and reduce response times.
                </p>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">30-Day Status History</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">January 8, 2024</span>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  <span className="text-sm">100% uptime</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">January 7, 2024</span>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  <span className="text-sm">100% uptime</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">January 6, 2024</span>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  <span className="text-sm">100% uptime</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">January 5, 2024</span>
                <div className="flex items-center text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                  <span className="text-sm">99.2% uptime - Brief maintenance</span>
                </div>
              </div>
              <div className="text-center mt-6">
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  View Complete History →
                </Link>
              </div>
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Get notified about status updates, maintenance, and incidents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe to Updates
              </Link>
              <Link 
                href="#" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
