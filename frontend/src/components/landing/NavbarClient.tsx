"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavbarClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="z-50 relative bg-slate-900/95 backdrop-blur-md border-slate-800 border-b">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-11 h-11">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-white text-xl">Sonexa AI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-between items-center ml-12">
            {/* Center Navigation */}
            <div className="flex flex-1 justify-center items-center space-x-12">
              <a
                href="#features"
                className="group relative font-medium text-slate-300 hover:text-white text-base transition-all duration-300"
              >
                Features
                <span className="-bottom-1 left-0 absolute bg-gradient-to-r from-blue-400 to-purple-500 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </a>
              <a
                href="#how-it-works"
                className="group relative font-medium text-slate-300 hover:text-white text-base transition-all duration-300"
              >
                How it Works
                <span className="-bottom-1 left-0 absolute bg-gradient-to-r from-blue-400 to-purple-500 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </a>
              <a
                href="#pricing"
                className="group relative font-medium text-slate-300 hover:text-white text-base transition-all duration-300"
              >
                Pricing
                <span className="-bottom-1 left-0 absolute bg-gradient-to-r from-blue-400 to-purple-500 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </a>
              <a
                href="#testimonials"
                className="group relative font-medium text-slate-300 hover:text-white text-base transition-all duration-300"
              >
                Reviews
                <span className="-bottom-1 left-0 absolute bg-gradient-to-r from-blue-400 to-purple-500 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </a>
            </div>

            {/* Right Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="hover:bg-slate-800 px-6 py-2 rounded-xl text-slate-300 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-800 border-slate-700 border-t"
        >
          <div className="space-y-3 px-4 py-3">
            <a
              href="#features"
              className="block text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-slate-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="block text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-slate-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="justify-start px-0 w-full text-slate-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
