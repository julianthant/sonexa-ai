// Types for analytics data
export interface AnalyticsData {
  totalVoiceMessages: number;
  responseRate: number;
  avgResponseTime: number;
  satisfactionScore: number;
  positiveResponses: number;
  negativeResponses: number;
  neutralResponses: number;
  weeklyTrends: Array<{ date: string; score: number }>;
  // New metrics
  accuracyRate: number;
  processingSpeed: number;
  aiConfidenceScore: number;
  escalationRate: number;
  resolutionRate: number;
  customerRetentionRate: number;
  peakHours: Array<{ hour: number; volume: number }>;
  languageDistribution: Array<{ language: string; percentage: number }>;
  deviceTypes: Array<{ device: string; count: number }>;
  errorRate: number;
  averageCallDuration: number;
  topKeywords: Array<{ keyword: string; frequency: number }>;
}

export interface MonthlyData {
  month: string;
  messages: number;
  satisfaction: number;
  accuracy: number;
  revenue: number;
}

export interface WeeklyPerformance {
  day: string;
  efficiency: number;
  satisfaction: number;
  volume: number;
  accuracy: number;
}

export interface GeographicData {
  region: string;
  messages: number;
  satisfaction: number;
  growth: number;
}

export interface AIInsight {
  category: string;
  trend: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
}

export interface SentimentData {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  target: number;
  unit: string;
}

export interface HourlyData {
  hour: string;
  messages: number;
  satisfaction: number;
}

export interface CategoryData {
  category: string;
  count: number;
  satisfaction: number;
  trend: number;
}

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  totalVoiceMessages: 2847,
  responseRate: 94.7,
  avgResponseTime: 2.3,
  satisfactionScore: 4.6,
  positiveResponses: 1889,
  negativeResponses: 542,
  neutralResponses: 267,
  weeklyTrends: [
    { date: "Dec 1", score: 4.4 },
    { date: "Dec 2", score: 4.5 },
    { date: "Dec 3", score: 4.6 },
    { date: "Dec 4", score: 4.5 },
    { date: "Dec 5", score: 4.7 },
    { date: "Dec 6", score: 4.6 },
    { date: "Dec 7", score: 4.6 },
  ],
  accuracyRate: 96.8,
  processingSpeed: 2.3,
  aiConfidenceScore: 94.2,
  escalationRate: 8.5,
  resolutionRate: 91.5,
  customerRetentionRate: 88.3,
  peakHours: [
    { hour: 9, volume: 180 },
    { hour: 10, volume: 220 },
    { hour: 11, volume: 195 },
    { hour: 14, volume: 210 },
    { hour: 15, volume: 185 },
    { hour: 16, volume: 160 },
  ],
  languageDistribution: [
    { language: "English", percentage: 68.5 },
    { language: "Spanish", percentage: 18.2 },
    { language: "French", percentage: 8.7 },
    { language: "German", percentage: 4.6 },
  ],
  deviceTypes: [
    { device: "Mobile", count: 1895 },
    { device: "Desktop", count: 672 },
    { device: "Tablet", count: 280 },
  ],
  errorRate: 3.2,
  averageCallDuration: 45.6,
  topKeywords: [
    { keyword: "billing", frequency: 234 },
    { keyword: "support", frequency: 189 },
    { keyword: "technical", frequency: 156 },
    { keyword: "account", frequency: 143 },
    { keyword: "cancel", frequency: 98 },
  ],
};

export const mockMonthlyData: MonthlyData[] = [
  {
    month: "Jan",
    messages: 1200,
    satisfaction: 4.2,
    accuracy: 94.1,
    revenue: 28500,
  },
  {
    month: "Feb",
    messages: 1350,
    satisfaction: 4.3,
    accuracy: 94.8,
    revenue: 31200,
  },
  {
    month: "Mar",
    messages: 1180,
    satisfaction: 4.1,
    accuracy: 93.7,
    revenue: 27800,
  },
  {
    month: "Apr",
    messages: 1420,
    satisfaction: 4.4,
    accuracy: 95.2,
    revenue: 33600,
  },
  {
    month: "May",
    messages: 1680,
    satisfaction: 4.5,
    accuracy: 95.8,
    revenue: 39200,
  },
  {
    month: "Jun",
    messages: 1850,
    satisfaction: 4.6,
    accuracy: 96.1,
    revenue: 42500,
  },
  {
    month: "Jul",
    messages: 2100,
    satisfaction: 4.7,
    accuracy: 96.5,
    revenue: 47800,
  },
  {
    month: "Aug",
    messages: 2350,
    satisfaction: 4.6,
    accuracy: 96.3,
    revenue: 53400,
  },
  {
    month: "Sep",
    messages: 2200,
    satisfaction: 4.5,
    accuracy: 95.9,
    revenue: 49600,
  },
  {
    month: "Oct",
    messages: 2480,
    satisfaction: 4.6,
    accuracy: 96.4,
    revenue: 56200,
  },
  {
    month: "Nov",
    messages: 2650,
    satisfaction: 4.7,
    accuracy: 96.8,
    revenue: 59800,
  },
  {
    month: "Dec",
    messages: 2847,
    satisfaction: 4.6,
    accuracy: 96.8,
    revenue: 64100,
  },
];

export const mockWeeklyPerformance: WeeklyPerformance[] = [
  {
    day: "Mon",
    efficiency: 92,
    satisfaction: 4.5,
    volume: 420,
    accuracy: 96.2,
  },
  {
    day: "Tue",
    efficiency: 88,
    satisfaction: 4.3,
    volume: 380,
    accuracy: 95.8,
  },
  {
    day: "Wed",
    efficiency: 95,
    satisfaction: 4.7,
    volume: 450,
    accuracy: 97.1,
  },
  {
    day: "Thu",
    efficiency: 91,
    satisfaction: 4.4,
    volume: 410,
    accuracy: 96.0,
  },
  {
    day: "Fri",
    efficiency: 89,
    satisfaction: 4.2,
    volume: 390,
    accuracy: 95.5,
  },
  {
    day: "Sat",
    efficiency: 94,
    satisfaction: 4.6,
    volume: 280,
    accuracy: 96.8,
  },
  {
    day: "Sun",
    efficiency: 97,
    satisfaction: 4.8,
    volume: 250,
    accuracy: 97.5,
  },
];

export const mockGeographicData: GeographicData[] = [
  { region: "North America", messages: 1420, satisfaction: 4.7, growth: 12.5 },
  { region: "Europe", messages: 890, satisfaction: 4.5, growth: 8.2 },
  { region: "Asia Pacific", messages: 537, satisfaction: 4.6, growth: 15.8 },
  { region: "Latin America", messages: 320, satisfaction: 4.3, growth: 22.1 },
  { region: "Middle East", messages: 180, satisfaction: 4.4, growth: 18.7 },
];

export const mockAIInsights: AIInsight[] = [
  {
    category: "Response Time",
    trend: "↓ 15% improvement",
    description: "Average response time decreased from 2.7s to 2.3s",
    impact: "positive",
  },
  {
    category: "Sentiment Analysis",
    trend: "↑ 8% positive increase",
    description: "Positive sentiment responses increased significantly",
    impact: "positive",
  },
  {
    category: "Peak Hours",
    trend: "2-4 PM highest activity",
    description: "Consistent pattern showing afternoon peak usage",
    impact: "neutral",
  },
  {
    category: "Escalation Rate",
    trend: "↓ 3% reduction",
    description: "Fewer messages requiring human intervention",
    impact: "positive",
  },
];

export const mockPerformanceMetrics: PerformanceMetric[] = [
  { name: "Response Rate", value: 94.7, change: 2.3, target: 95.0, unit: "%" },
  {
    name: "Resolution Rate",
    value: 91.5,
    change: 1.8,
    target: 90.0,
    unit: "%",
  },
  {
    name: "Customer Retention",
    value: 88.3,
    change: -0.5,
    target: 90.0,
    unit: "%",
  },
  { name: "AI Accuracy", value: 96.8, change: 1.2, target: 96.0, unit: "%" },
];

export const mockHourlyData: HourlyData[] = [
  { hour: "00", messages: 45, satisfaction: 4.2 },
  { hour: "01", messages: 32, satisfaction: 4.1 },
  { hour: "02", messages: 28, satisfaction: 4.0 },
  { hour: "03", messages: 23, satisfaction: 4.1 },
  { hour: "04", messages: 19, satisfaction: 4.2 },
  { hour: "05", messages: 35, satisfaction: 4.3 },
  { hour: "06", messages: 78, satisfaction: 4.4 },
  { hour: "07", messages: 125, satisfaction: 4.5 },
  { hour: "08", messages: 180, satisfaction: 4.6 },
  { hour: "09", messages: 220, satisfaction: 4.7 },
  { hour: "10", messages: 195, satisfaction: 4.6 },
  { hour: "11", messages: 185, satisfaction: 4.5 },
  { hour: "12", messages: 160, satisfaction: 4.4 },
  { hour: "13", messages: 175, satisfaction: 4.5 },
  { hour: "14", messages: 210, satisfaction: 4.6 },
  { hour: "15", messages: 185, satisfaction: 4.5 },
  { hour: "16", messages: 160, satisfaction: 4.4 },
  { hour: "17", messages: 140, satisfaction: 4.3 },
  { hour: "18", messages: 110, satisfaction: 4.2 },
  { hour: "19", messages: 95, satisfaction: 4.1 },
  { hour: "20", messages: 80, satisfaction: 4.0 },
  { hour: "21", messages: 70, satisfaction: 4.1 },
  { hour: "22", messages: 55, satisfaction: 4.2 },
  { hour: "23", messages: 48, satisfaction: 4.1 },
];

export const mockCategoryData: CategoryData[] = [
  { category: "Technical Support", count: 890, satisfaction: 4.2, trend: 5.2 },
  { category: "Billing Inquiries", count: 675, satisfaction: 4.0, trend: -2.1 },
  { category: "Account Management", count: 543, satisfaction: 4.5, trend: 8.7 },
  {
    category: "Product Information",
    count: 432,
    satisfaction: 4.7,
    trend: 12.3,
  },
  { category: "Complaints", count: 307, satisfaction: 3.8, trend: -15.4 },
];

// Server-side data fetching functions
export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  // In a real app, this would be an API call
  // For now, return mock data with a slight delay to simulate network
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockAnalyticsData;
}

export async function fetchMonthlyData(): Promise<MonthlyData[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockMonthlyData;
}

export async function fetchWeeklyPerformance(): Promise<WeeklyPerformance[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockWeeklyPerformance;
}

export async function fetchGeographicData(): Promise<GeographicData[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockGeographicData;
}

export async function fetchAIInsights(): Promise<AIInsight[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockAIInsights;
}

export async function fetchPerformanceMetrics(): Promise<PerformanceMetric[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockPerformanceMetrics;
}

export async function fetchHourlyData(): Promise<HourlyData[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockHourlyData;
}

export async function fetchCategoryData(): Promise<CategoryData[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCategoryData;
}
