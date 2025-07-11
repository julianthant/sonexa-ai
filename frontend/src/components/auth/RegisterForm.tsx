"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import type { RegisterRequest } from "@/types/auth";
import { EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/outline";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest & { confirmPassword: string }>();

  const password = watch("password");

  const onSubmit = async (
    data: RegisterRequest & { confirmPassword: string }
  ) => {
    setIsLoading(true);

    try {
      const response = await apiService.register(
        data.username,
        data.email,
        data.password
      );

      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        toast.success(`Welcome to Sonexa AI, ${response.data.user.username}!`);
        router.push("/dashboard");
      } else {
        toast.error(response.error?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.error("Google OAuth is not configured yet");
  };

  const handleMicrosoftSignup = () => {
    toast.error("Microsoft OAuth is not configured yet");
  };

  const passwordStrength = (password: string) => {
    if (!password) return { score: 0, text: "", color: "", checks: null };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    const strengthMap = {
      0: { text: "", color: "" },
      1: { text: "Very Weak", color: "text-red-500" },
      2: { text: "Weak", color: "text-orange-500" },
      3: { text: "Fair", color: "text-yellow-500" },
      4: { text: "Good", color: "text-blue-500" },
      5: { text: "Strong", color: "text-green-500" },
    };

    const strengthInfo = strengthMap[score as keyof typeof strengthMap];

    return { score, checks, ...strengthInfo };
  };

  const strength = passwordStrength(password || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="bg-white/80 shadow-2xl backdrop-blur-lg p-8 border border-white/20 rounded-2xl">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-2xl w-16 h-16"
          >
            <span className="font-bold text-white text-2xl">S</span>
          </motion.div>
          <h2 className="font-bold text-gray-900 text-2xl">
            Create your account
          </h2>
          <p className="mt-2 text-gray-600">
            Join Sonexa AI and start your journey
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="hover:bg-gray-50 border-2 w-full h-12 transition-all duration-200"
          >
            <svg className="mr-3 w-5 h-5" viewBox="0 0 24 24">
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
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleMicrosoftSignup}
            className="hover:bg-gray-50 border-2 w-full h-12 transition-all duration-200"
          >
            <svg className="mr-3 w-5 h-5" viewBox="0 0 24 24">
              <path fill="#f25022" d="M1 1h10v10H1z" />
              <path fill="#00a4ef" d="M12 1h10v10H12z" />
              <path fill="#7fba00" d="M1 12h10v10H1z" />
              <path fill="#ffb900" d="M12 12h10v10H12z" />
            </svg>
            Continue with Microsoft
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="border-gray-200 border-t w-full"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">
              Or create with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
              type="text"
              className="input-field"
              placeholder="Choose a username"
            />
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-600 text-sm"
              >
                {errors.username.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Email address
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
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-600 text-sm"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="pr-12 input-field"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 text-xs">
                    Password strength:
                  </span>
                  <span className={`text-xs font-medium ${strength.color}`}>
                    {strength.text}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full w-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strength.score <= 1
                        ? "bg-red-500"
                        : strength.score <= 2
                        ? "bg-orange-500"
                        : strength.score <= 3
                        ? "bg-yellow-500"
                        : strength.score <= 4
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(strength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="gap-2 grid grid-cols-2 mt-2 text-xs">
                  {strength.checks &&
                    Object.entries({
                      "8+ characters": strength.checks.length,
                      Lowercase: strength.checks.lowercase,
                      Uppercase: strength.checks.uppercase,
                      Number: strength.checks.number,
                      "Special char": strength.checks.special,
                    }).map(([label, passed]) => (
                      <div
                        key={label}
                        className={`flex items-center ${
                          passed ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <CheckIcon
                          className={`w-3 h-3 mr-1 ${
                            passed ? "text-green-500" : "text-gray-300"
                          }`}
                        />
                        {label}
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-600 text-sm"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium text-gray-700 text-sm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="pr-12 input-field"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-600 text-sm"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-0.5 border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
            />
            <label className="ml-2 text-gray-600 text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full h-12 font-medium text-white hover:scale-105 transition-all duration-200 transform"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
