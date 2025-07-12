import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="mx-auto px-4 max-w-4xl text-center">
        <div className="mb-8">
          <div className="inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl mb-8 rounded-2xl w-20 h-20">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="mb-6 font-bold text-gray-900 text-5xl md:text-7xl leading-tight">
          Intelligent
          <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent">
            {" "}
            AI
          </span>
          <br />
          Processing
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-gray-600 text-xl md:text-2xl leading-relaxed">
          Experience the power of tier-based AI processing with Sonexa AI. From
          Azure AI for exploration to OpenAI for advanced tasks.
        </p>

        <div className="flex sm:flex-row flex-col justify-center gap-4">
          <Link href="/home">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-xl hover:shadow-2xl text-white hover:scale-105 transition-all duration-200 transform"
            >
              Enter Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
