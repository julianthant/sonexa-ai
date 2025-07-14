"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { apiService } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest } from "@/types/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function ModernLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);

    try {
      const response = await apiService.login(data.email, data.password);

      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else {
        toast.error(response.error?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "microsoft") => {
    toast(`${provider} OAuth integration coming soon!`, {
      icon: "ℹ️",
    });
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 shadow-2xl backdrop-blur-lg p-8 border border-white/20 rounded-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 font-bold text-white text-3xl"
            >
              Welcome Back
            </motion.h2>
            <p className="text-blue-200">Sign in to your Sonexa AI account</p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth("google")}
              className="group flex justify-center items-center hover:bg-white/10 px-4 py-3 border border-white/20 rounded-xl w-full text-white transition-all duration-300"
            >
              <svg className="mr-3 w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth("microsoft")}
              className="group flex justify-center items-center hover:bg-white/10 px-4 py-3 border border-white/20 rounded-xl w-full text-white transition-all duration-300"
            >
              <svg className="mr-3 w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
                />
              </svg>
              Continue with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="border-white/20 border-t w-full"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-blue-200">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-blue-200 text-sm">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="bg-white/10 px-4 py-3 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all duration-300 placeholder-blue-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-red-400 text-sm"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-blue-200 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="bg-white/10 px-4 py-3 pr-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all duration-300 placeholder-blue-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="top-1/2 right-3 absolute text-blue-300 hover:text-white transition-colors -translate-y-1/2 transform"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-red-400 text-sm"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-cyan-600 hover:to-cyan-700 disabled:opacity-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent w-full font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/auth/register")}
                className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
