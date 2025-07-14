import type { AuthUser } from "@/types/auth";

export interface ApiError {
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export const API_BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
    : "http://localhost:8080";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}/api${endpoint}`;
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Network error occurred",
        }));
        return {
          success: false,
          error: {
            message: errorData.message || `HTTP ${response.status}`,
            details: errorData,
          },
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          details: error,
        },
      };
    }
  }

  // Auth endpoints
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ token: string; user: AuthUser }>> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    company?: string
  ): Promise<ApiResponse<{ token: string; user: AuthUser }>> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password, company }),
    });
  }

  // AI Processing endpoints
  async processText(
    text: string,
    subscriptionTier: string = "free"
  ): Promise<ApiResponse<{ result: string; tier_used: string }>> {
    return this.request("/ai/process-text", {
      method: "POST",
      body: JSON.stringify({ text, subscription_tier: subscriptionTier }),
    });
  }

  async chatWithAI(
    message: string,
    subscriptionTier: string = "free"
  ): Promise<ApiResponse<{ response: string; tier_used: string }>> {
    return this.request("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message, subscription_tier: subscriptionTier }),
    });
  }

  // Stripe endpoints
  async createCheckoutSession(
    priceId: string
  ): Promise<ApiResponse<{ sessionId: string; checkoutUrl: string }>> {
    return this.request("/stripe/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    });
  }

  async getSubscriptionStatus(): Promise<
    ApiResponse<{
      active: boolean;
      tier: string;
      current_period_end?: string;
    }>
  > {
    return this.request("/stripe/subscription-status");
  }

  // Health check
  async healthCheck(): Promise<
    ApiResponse<{ status: string; timestamp: string }>
  > {
    return this.request("/health");
  }
}

export const apiService = new ApiService();
