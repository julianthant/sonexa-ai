"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  EyeOff,
  Loader2,
  MessageSquare,
  Mail,
  Lock,
  User,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { apiService } from "@/lib/api";

interface ModernAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  customVoiceEmail?: string;
}

export function ModernAuthModal({
  isOpen,
  onClose,
  mode: initialMode,
}: ModernAuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(data.email, data.password);
      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        toast.success("Welcome back!");
        onClose();
      } else {
        toast.error(response.error?.message || "Login failed");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.organizationName
      );
      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        toast.success("Account created successfully!");
        onClose();
      } else {
        toast.error(response.error?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    loginForm.reset();
    registerForm.reset();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="z-50 fixed inset-0 flex justify-center items-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-slate-800/95 shadow-2xl backdrop-blur-md border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
            <button
              onClick={onClose}
              className="top-4 right-4 absolute hover:bg-white/10 p-2 rounded-lg text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-2">
              <div className="flex justify-center items-center bg-white/20 rounded-xl w-10 h-10">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-white text-xl">Sonexa AI</span>
            </div>

            <h2 className="mb-2 font-bold text-white text-2xl">
              {mode === "login" ? "Welcome Back" : "Join Sonexa AI"}
            </h2>
            <p className="text-blue-100">
              {mode === "login"
                ? "Sign in to access your voice intelligence dashboard"
                : "Create your account and start transforming voice into insights"}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  className="space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="font-medium text-slate-300 text-sm">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                      <input
                        {...loginForm.register("email", { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="font-medium text-slate-300 text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                      <input
                        {...loginForm.register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-slate-700/50 py-3 pr-12 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="top-1/2 right-3 absolute text-slate-400 hover:text-slate-300 -translate-y-1/2 transform"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 py-3 w-full text-white hover:scale-105 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                  className="space-y-4"
                >
                  {/* Name Fields */}
                  <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-medium text-slate-300 text-sm">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                        <input
                          {...registerForm.register("firstName", {
                            required: true,
                          })}
                          type="text"
                          placeholder="First name"
                          className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-slate-300 text-sm">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                        <input
                          {...registerForm.register("lastName", {
                            required: true,
                          })}
                          type="text"
                          placeholder="Last name"
                          className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="font-medium text-slate-300 text-sm">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                      <input
                        {...registerForm.register("email", { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Organization Name */}
                  <div className="space-y-2">
                    <label className="font-medium text-slate-300 text-sm">
                      Organization
                    </label>
                    <div className="relative">
                      <Building className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                      <input
                        {...registerForm.register("organizationName", {
                          required: true,
                        })}
                        type="text"
                        placeholder="Your organization name"
                        className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-medium text-slate-300 text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                        <input
                          {...registerForm.register("password", {
                            required: true,
                          })}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="bg-slate-700/50 py-3 pr-12 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="top-1/2 right-3 absolute text-slate-400 hover:text-slate-300 -translate-y-1/2 transform"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-slate-300 text-sm">
                        Confirm
                      </label>
                      <div className="relative">
                        <Lock className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                        <input
                          {...registerForm.register("confirmPassword", {
                            required: true,
                          })}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm"
                          className="bg-slate-700/50 py-3 pr-12 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="top-1/2 right-3 absolute text-slate-400 hover:text-slate-300 -translate-y-1/2 transform"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Custom Voice Email (Optional) */}
                  <div className="space-y-2">
                    <label className="font-medium text-slate-300 text-sm">
                      Custom Voice Email (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                      <input
                        {...registerForm.register("customVoiceEmail")}
                        type="email"
                        placeholder="custom@yourcompany.com"
                        className="bg-slate-700/50 py-3 pr-4 pl-10 border border-slate-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white transition-all placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 py-3 w-full text-white hover:scale-105 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Mode Switch */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={switchMode}
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
