"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  RefreshCw,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  AlertCircle,
  BarChart3,
  Brain,
  Zap,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import {
  AnalyticsData,
  MonthlyData,
  WeeklyPerformance,
  GeographicData,
  AIInsight,
  SentimentData,
  PerformanceMetric,
  HourlyData,
  CategoryData,
} from "@/data/analytics";

interface AnalyticsClientProps {
  analyticsData: AnalyticsData;
  monthlyData: MonthlyData[];
  weeklyPerformance: WeeklyPerformance[];
  geographicData: GeographicData[];
  aiInsights: AIInsight[];
  performanceMetrics: PerformanceMetric[];
  hourlyData: HourlyData[];
  categoryData: CategoryData[];
}

export function AnalyticsClient({
  analyticsData,
  monthlyData,
  weeklyPerformance,
  geographicData,
  aiInsights,
  performanceMetrics,
  hourlyData,
  categoryData,
}: AnalyticsClientProps) {
  // Sample data for charts - using props data
  const sentimentData: SentimentData[] = [
    {
      name: "Positive",
      value: analyticsData.positiveResponses,
      color: "#10B981",
    },
    {
      name: "Negative",
      value: analyticsData.negativeResponses,
      color: "#EF4444",
    },
    {
      name: "Neutral",
      value: analyticsData.neutralResponses,
      color: "#6B7280",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="bg-white border-gray-300 w-32 text-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 border-gray-300 text-gray-700"
          >
            <Download className="mr-2 w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="hover:bg-gray-50 border-gray-300 text-gray-700"
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Total Messages
                  </p>
                  <p className="font-bold text-gray-900 text-3xl">
                    {analyticsData.totalVoiceMessages.toLocaleString()}
                  </p>
                  <p className="mt-1 text-green-600 text-sm">
                    <TrendingUp className="inline mr-1 w-4 h-4" />
                    +12% from last month
                  </p>
                </div>
                <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Response Rate
                  </p>
                  <p className="font-bold text-gray-900 text-3xl">
                    {analyticsData.responseRate}%
                  </p>
                  <p className="mt-1 text-green-600 text-sm">
                    <TrendingUp className="inline mr-1 w-4 h-4" />
                    +2.1% from last month
                  </p>
                </div>
                <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Avg Response Time
                  </p>
                  <p className="font-bold text-gray-900 text-3xl">
                    {analyticsData.avgResponseTime}s
                  </p>
                  <p className="mt-1 text-green-600 text-sm">
                    <TrendingUp className="inline mr-1 w-4 h-4" />
                    15% faster
                  </p>
                </div>
                <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-12 h-12">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Satisfaction Score
                  </p>
                  <p className="font-bold text-gray-900 text-3xl">
                    {analyticsData.satisfactionScore}/5.0
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(analyticsData.satisfactionScore)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 bg-gray-100 w-full">
          <TabsTrigger value="overview" className="text-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="text-gray-700">
            Sentiment
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-gray-700">
            Performance
          </TabsTrigger>
          <TabsTrigger value="geographic" className="text-gray-700">
            Geographic
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-gray-700">
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {/* Monthly Trends */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Monthly Message Volume
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Messages processed over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="messages"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Satisfaction Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Satisfaction Trends
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Customer satisfaction over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis domain={[3.5, 5]} stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {/* Sentiment Distribution */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Sentiment Distribution
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Breakdown of message sentiment analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sentiment Stats */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Sentiment Analytics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Detailed sentiment breakdown and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 text-sm">
                      Positive
                    </span>
                    <span className="text-gray-900 text-sm">
                      {analyticsData.positiveResponses} messages
                    </span>
                  </div>
                  <Progress value={66.4} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 text-sm">
                      Negative
                    </span>
                    <span className="text-gray-900 text-sm">
                      {analyticsData.negativeResponses} messages
                    </span>
                  </div>
                  <Progress value={19.0} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 text-sm">
                      Neutral
                    </span>
                    <span className="text-gray-900 text-sm">
                      {analyticsData.neutralResponses} messages
                    </span>
                  </div>
                  <Progress value={9.4} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Weekly Performance
              </CardTitle>
              <CardDescription className="text-gray-600">
                Efficiency and satisfaction metrics by day of week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="efficiency"
                    fill="#3b82f6"
                    name="Efficiency %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Geographic Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Message volume and satisfaction by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={geographicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="messages"
                    type="number"
                    name="Messages"
                    stroke="#6b7280"
                  />
                  <YAxis
                    dataKey="satisfaction"
                    type="number"
                    name="Satisfaction"
                    domain={[4.0, 5.0]}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter dataKey="satisfaction" fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-gray-900">
                          {insight.category}
                        </h3>
                        <p className="mb-3 text-gray-600 text-sm">
                          {insight.description}
                        </p>
                        <Badge
                          variant={
                            insight.impact === "positive"
                              ? "default"
                              : insight.impact === "negative"
                              ? "destructive"
                              : "secondary"
                          }
                          className={
                            insight.impact === "positive"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : insight.impact === "negative"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {insight.trend}
                        </Badge>
                      </div>
                      <div className="ml-4">
                        {insight.impact === "positive" ? (
                          <div className="flex justify-center items-center bg-green-100 rounded-lg w-10 h-10">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                        ) : insight.impact === "negative" ? (
                          <div className="flex justify-center items-center bg-red-100 rounded-lg w-10 h-10">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
                            <Brain className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* AI Performance Summary */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Brain className="mr-2 w-5 h-5 text-blue-600" />
                AI Performance Summary
              </CardTitle>
              <CardDescription className="text-gray-600">
                Overall AI system performance and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-center">
                  <Zap className="mx-auto mb-2 w-8 h-8 text-green-600" />
                  <p className="font-medium text-green-800 text-sm">
                    Processing Speed
                  </p>
                  <p className="font-bold text-green-900 text-2xl">Fast</p>
                  <p className="text-green-600 text-xs">Avg 2.3s response</p>
                </div>
                <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg text-center">
                  <BarChart3 className="mx-auto mb-2 w-8 h-8 text-blue-600" />
                  <p className="font-medium text-blue-800 text-sm">
                    Accuracy Rate
                  </p>
                  <p className="font-bold text-blue-900 text-2xl">94.7%</p>
                  <p className="text-blue-600 text-xs">Above target</p>
                </div>
                <div className="bg-purple-50 p-4 border border-purple-200 rounded-lg text-center">
                  <Globe className="mx-auto mb-2 w-8 h-8 text-purple-600" />
                  <p className="font-medium text-purple-800 text-sm">
                    Coverage
                  </p>
                  <p className="font-bold text-purple-900 text-2xl">Global</p>
                  <p className="text-purple-600 text-xs">24/7 availability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
