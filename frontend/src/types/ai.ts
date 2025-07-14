export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  tier_used?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
}

export interface AIProcessingRequest {
  text: string;
  subscription_tier: string;
}

export interface AIProcessingResponse {
  result: string;
  tier_used: string;
}

export interface ChatRequest {
  message: string;
  subscription_tier: string;
}

export interface ChatResponse {
  response: string;
  tier_used: string;
}
