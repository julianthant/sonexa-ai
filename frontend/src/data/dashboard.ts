// Types for dashboard
export interface DashboardMetrics {
  totalMessages: number;
  newMessagesToday: number;
  processingSpeed: number;
  storageUsed: number;
  acceptedMessages: number;
  rejectedMessages: number;
  quarantinedMessages: number;
  processingMessages: number;
  averageResponseTime: number;
  systemUptime: number;
}

export interface RecentActivity {
  id: string;
  type: "email_verification" | "team_activity" | "system" | "security" | "notification";
  status: "success" | "pending" | "warning" | "error" | "info";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  voiceMessageId?: string; // Reference to voice message if related
  teamId?: string; // Reference to team if related
  action?: () => void;
}

// Mock dashboard data
export const mockDashboardMetrics: DashboardMetrics = {
  totalMessages: 2847,
  newMessagesToday: 47,
  processingSpeed: 2.3,
  storageUsed: 68.5,
  acceptedMessages: 1889,
  rejectedMessages: 267,
  quarantinedMessages: 542,
  processingMessages: 149,
  averageResponseTime: 2.3,
  systemUptime: 99.8,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "email_verification",
    status: "success",
    title: "Email verified successfully",
    description: "Company verified their email voice+sonexa-vm-12345-abcdef@sonexa.ai",
    timestamp: "2 minutes ago",
    icon: "Mail",
    voiceMessageId: "sonexa-vm-12345-abcdef",
  },
  {
    id: "2",
    type: "team_activity",
    status: "info",
    title: "Voice message shared",
    description: "Sarah Johnson shared a voice message with the Marketing team",
    timestamp: "5 minutes ago",
    icon: "Users",
    teamId: "team-marketing-001",
    voiceMessageId: "sonexa-vm-67890-ghijkl",
  },
  {
    id: "3",
    type: "email_verification",
    status: "pending",
    title: "New email received",
    description: "Email sent to voice+sonexa-vm-11111-aaaaaa@sonexa.ai awaiting verification",
    timestamp: "8 minutes ago",
    icon: "Mail",
    voiceMessageId: "sonexa-vm-11111-aaaaaa",
  },
  {
    id: "4",
    type: "system",
    status: "info",
    title: "System maintenance completed",
    description: "Routine optimization improved voice message processing by 8%",
    timestamp: "1 hour ago",
    icon: "Settings",
  },
  {
    id: "5",
    type: "notification",
    status: "success",
    title: "CSV upload processed",
    description: "Document batch-001.csv successfully processed and indexed",
    timestamp: "2 hours ago",
    icon: "FileText",
  },
  {
    id: "6",
    type: "email_verification",
    status: "error",
    title: "Email verification failed",
    description: "Security code mismatch for voice+sonexa-vm-99999-zzzzzz@sonexa.ai",
    timestamp: "3 hours ago",
    icon: "AlertTriangle",
    voiceMessageId: "sonexa-vm-99999-zzzzzz",
  },
];

// Server-side data fetching functions
export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockDashboardMetrics;
}

export async function fetchRecentActivity(): Promise<RecentActivity[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockRecentActivity;
}
