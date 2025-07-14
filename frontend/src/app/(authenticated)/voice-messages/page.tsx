import { Metadata } from "next";
import VoiceMessagesClient from "@/components/voice/VoiceMessagesList";

export const metadata: Metadata = {
  title: "Voice Messages - Sonexa AI",
  description: "View and manage your voice messages received via email or uploaded directly.",
};

export default function VoiceMessagesPage() {
  return <VoiceMessagesClient />;
}
