export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  subscription_tier?: "free" | "basic" | "premium" | "enterprise";
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
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
