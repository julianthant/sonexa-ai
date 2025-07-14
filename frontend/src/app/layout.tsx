import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { AuthHydration } from "@/components/auth/AuthHydration";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonexa AI - Intelligent AI Processing",
  description:
    "Experience the power of tier-based AI processing with smart routing between Azure AI and OpenAI",
  keywords: [
    "AI",
    "OpenAI",
    "Azure AI",
    "artificial intelligence",
    "machine learning",
    "chatbot",
    "API",
  ],
  authors: [{ name: "Sonexa AI Team" }],
  creator: "Sonexa AI",
  publisher: "Sonexa AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sonexa-ai.com",
    siteName: "Sonexa AI",
    title: "Sonexa AI - Intelligent AI Processing",
    description:
      "Experience the power of tier-based AI processing with smart routing between Azure AI and OpenAI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <AuthHydration>{children}</AuthHydration>
          <Toaster position="top-right" richColors theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
