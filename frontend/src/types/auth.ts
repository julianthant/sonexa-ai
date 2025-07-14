export interface AuthUser {
  id: string;
  username?: string; // Backend returns "User " format from firstName + lastName
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role: "USER" | "ADMIN";
  customVoiceEmail?: string;
  subscription_tier?: "free" | "basic" | "premium" | "enterprise";
  createdAt: string; // Backend uses camelCase
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
