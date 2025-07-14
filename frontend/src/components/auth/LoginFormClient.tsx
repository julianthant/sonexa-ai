"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { apiService } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const form = useForm<LoginFormData>();

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(data.email, data.password);
      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        toast.success("Welcome back!");
        router.push("/home");
      } else {
        toast.error(response.error?.message || "Login failed");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-2 font-semibold text-white text-2xl">Sign in</h1>
        <p className="text-slate-400 text-sm">Welcome back to Sonexa AI</p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-slate-200 text-sm"
          >
            Email
          </label>
          <input
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-4 py-3 border border-slate-700 focus:border-slate-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 w-full text-white transition-colors placeholder-slate-500"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-red-400 text-xs">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="font-medium text-slate-200 text-sm"
            >
              Password
            </label>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-300 text-xs transition-colors"
              onClick={() => window.location.href = '/help'}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              {...form.register("password", {
                required: "Password is required",
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-4 py-3 pr-12 border border-slate-700 focus:border-slate-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 w-full text-white transition-colors placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="top-1/2 right-4 absolute text-slate-400 hover:text-slate-300 transition-colors -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="mt-1 text-red-400 text-xs">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center items-center gap-2 bg-white hover:bg-slate-100 disabled:opacity-50 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-full font-medium text-black transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="border-2 border-t-transparent border-black rounded-full w-4 h-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="border-slate-800 border-t w-full" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-3 text-slate-500">or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="flex justify-center items-center bg-transparent hover:bg-slate-800/50 p-3 border border-slate-700 hover:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 transition-colors"
            title="Continue with Google"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="flex justify-center items-center bg-transparent hover:bg-slate-800/50 p-3 border border-slate-700 hover:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 transition-colors"
            title="Continue with Microsoft"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#00A4EF" d="M13 1h10v10H13z" />
              <path fill="#7FBA00" d="M1 13h10v10H1z" />
              <path fill="#FFB900" d="M13 13h10v10H13z" />
            </svg>
          </button>

          <button
            type="button"
            className="flex justify-center items-center bg-transparent hover:bg-slate-800/50 p-3 border border-slate-700 hover:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 transition-colors"
            title="Continue with GitHub"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </button>
        </div>

        {/* Sign up link */}
        <p className="mt-8 text-slate-400 text-sm text-center">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="font-medium text-white hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
