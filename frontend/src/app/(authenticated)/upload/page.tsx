import { Metadata } from "next";
import UploadClient from "@/components/upload/UploadClient";

export const metadata: Metadata = {
  title: "Upload Voice Files - Sonexa AI",
  description: "Upload and manage your voice message files.",
};

export default function UploadPage() {
  // In a real app, you'd get this from your auth context
  const organizationId = "org_123"; // Placeholder

  return <UploadClient organizationId={organizationId} />;
}
