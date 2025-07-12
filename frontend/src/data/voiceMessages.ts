// Types for voice messages
export interface VoiceMessage {
  id: string;
  fromNumber: string;
  toNumber: string;
  messageContent: string;
  audioFileUrl?: string;
  duration?: number;
  status: "accepted" | "rejected" | "quarantined" | "processing";
  aiAnalysis?: string;
  responseType?:
    | "POSITIVE"
    | "NEGATIVE"
    | "NEUTRAL"
    | "ESCALATE"
    | "CALLBACK_REQUESTED";
  responseText?: string;
  createdAt: string;
  updatedAt: string;
  sentiment?: "positive" | "negative" | "neutral";
  priority?: "high" | "medium" | "low";
}

export interface VoiceMessagesResponse {
  content: VoiceMessage[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Mock voice messages data
export const mockVoiceMessages: VoiceMessage[] = [
  {
    id: "1",
    fromNumber: "+1 (555) 123-4567",
    toNumber: "support@sonexa.ai",
    messageContent:
      "Hi, I need help with my account setup. Can someone call me back?",
    audioFileUrl: "/audio/sample1.mp3",
    duration: 45,
    status: "accepted",
    aiAnalysis:
      "Customer requesting account assistance. Polite tone, high urgency.",
    responseType: "CALLBACK_REQUESTED",
    responseText: "Customer needs account setup help",
    createdAt: "2024-12-08T10:30:00Z",
    updatedAt: "2024-12-08T10:35:00Z",
    sentiment: "neutral",
    priority: "high",
  },
  {
    id: "2",
    fromNumber: "+1 (555) 987-6543",
    toNumber: "sales@sonexa.ai",
    messageContent:
      "Thank you for the great service! Everything is working perfectly.",
    audioFileUrl: "/audio/sample2.mp3",
    duration: 32,
    status: "accepted",
    aiAnalysis: "Positive feedback about service quality. Happy customer.",
    responseType: "POSITIVE",
    responseText: "Customer satisfaction confirmed",
    createdAt: "2024-12-08T09:15:00Z",
    updatedAt: "2024-12-08T09:20:00Z",
    sentiment: "positive",
    priority: "low",
  },
  {
    id: "3",
    fromNumber: "+1 (555) 456-7890",
    toNumber: "support@sonexa.ai",
    messageContent:
      "I am having trouble with the billing system. This is very frustrating.",
    audioFileUrl: "/audio/sample3.mp3",
    duration: 67,
    status: "quarantined",
    aiAnalysis: "Billing issue reported. Customer sounds frustrated.",
    responseType: "ESCALATE",
    responseText: "Billing system issue needs escalation",
    createdAt: "2024-12-08T08:45:00Z",
    updatedAt: "2024-12-08T08:50:00Z",
    sentiment: "negative",
    priority: "high",
  },
  {
    id: "4",
    fromNumber: "+1 (555) 321-9876",
    toNumber: "support@sonexa.ai",
    messageContent: "Just wanted to let you know the product is working great!",
    audioFileUrl: "/audio/sample4.mp3",
    duration: 28,
    status: "accepted",
    aiAnalysis: "Positive feedback about product performance.",
    responseType: "POSITIVE",
    responseText: "Product performance feedback",
    createdAt: "2024-12-08T07:30:00Z",
    updatedAt: "2024-12-08T07:35:00Z",
    sentiment: "positive",
    priority: "low",
  },
  {
    id: "5",
    fromNumber: "+1 (555) 654-3210",
    toNumber: "support@sonexa.ai",
    messageContent: "There seems to be an issue with my account login.",
    audioFileUrl: "/audio/sample5.mp3",
    duration: 41,
    status: "processing",
    aiAnalysis: "Technical support request for login issues.",
    responseType: "NEUTRAL",
    responseText: "Login issue reported",
    createdAt: "2024-12-08T06:15:00Z",
    updatedAt: "2024-12-08T06:20:00Z",
    sentiment: "neutral",
    priority: "medium",
  },
  {
    id: "6",
    fromNumber: "+1 (555) 789-0123",
    toNumber: "support@sonexa.ai",
    messageContent: "This is spam content trying to sell something unrelated.",
    audioFileUrl: "/audio/sample6.mp3",
    duration: 55,
    status: "rejected",
    aiAnalysis: "Detected spam content, unrelated to business.",
    responseType: "NEGATIVE",
    responseText: "Spam content detected",
    createdAt: "2024-12-08T05:45:00Z",
    updatedAt: "2024-12-08T05:50:00Z",
    sentiment: "neutral",
    priority: "low",
  },
];

// Server-side data fetching functions
export async function fetchVoiceMessages(params?: {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
}): Promise<VoiceMessagesResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filteredMessages = [...mockVoiceMessages];

  // Apply filters
  if (params?.search) {
    filteredMessages = filteredMessages.filter((msg) =>
      msg.messageContent.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  if (params?.status && params.status !== "all") {
    filteredMessages = filteredMessages.filter(
      (msg) => msg.status === params.status
    );
  }

  // Pagination
  const page = params?.page || 0;
  const size = params?.size || 10;
  const start = page * size;
  const end = start + size;
  const paginatedMessages = filteredMessages.slice(start, end);

  return {
    content: paginatedMessages,
    totalElements: filteredMessages.length,
    totalPages: Math.ceil(filteredMessages.length / size),
    size,
    number: page,
  };
}

export async function updateVoiceMessageStatus(
  id: string,
  status: string
): Promise<VoiceMessage> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const message = mockVoiceMessages.find((msg) => msg.id === id);
  if (!message) {
    throw new Error("Message not found");
  }

  // Update the status (in a real app, this would update the database)
  message.status = status as VoiceMessage["status"];
  message.updatedAt = new Date().toISOString();

  return message;
}
