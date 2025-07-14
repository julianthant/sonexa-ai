"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, Play, Pause, Send, Users, Trash2 } from "lucide-react";

type RecordingState = "idle" | "recording" | "recorded" | "playing";

export default function VoiceRecorder() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingState("recording");
      setDuration(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.stop();
      setRecordingState("recorded");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setRecordingState("playing");

      audioRef.current.onended = () => {
        setRecordingState("recorded");
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setRecordingState("recorded");
    }
  };

  const discardRecording = () => {
    setRecordingState("idle");
    setDuration(0);
    setAudioBlob(null);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  const addRecipient = (email: string) => {
    if (email && !recipients.includes(email)) {
      setRecipients((prev) => [...prev, email]);
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients((prev) => prev.filter((r) => r !== email));
  };

  const handleSend = () => {
    // Simulate sending
    console.log("Sending voice message:", {
      title: messageTitle,
      description: messageDescription,
      recipients,
      priority,
      audioBlob,
      duration,
    });

    // Reset form
    setRecordingState("idle");
    setDuration(0);
    setAudioBlob(null);
    setMessageTitle("");
    setMessageDescription("");
    setRecipients([]);
    setPriority("medium");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Record Voice Message</CardTitle>
          <CardDescription>
            Record your message and select recipients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Area */}
          <div className="flex justify-center items-center py-12 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="text-center">
              <div
                className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${
                  recordingState === "recording"
                    ? "bg-red-500 animate-pulse"
                    : recordingState === "recorded"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                <Mic className="w-8 h-8 text-white" />
              </div>

              <h3 className="mb-2 font-medium text-gray-900 text-lg">
                {recordingState === "idle" && "Ready to Record"}
                {recordingState === "recording" && "Recording..."}
                {recordingState === "recorded" && "Recording Complete"}
                {recordingState === "playing" && "Playing..."}
              </h3>

              <p className="mb-4 text-gray-500">
                Duration: {formatTime(duration)}
              </p>

              <div className="flex justify-center space-x-3">
                {recordingState === "idle" && (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Mic className="mr-2 w-4 h-4" />
                    Start Recording
                  </Button>
                )}

                {recordingState === "recording" && (
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    variant="destructive"
                  >
                    <Square className="mr-2 w-4 h-4" />
                    Stop Recording
                  </Button>
                )}

                {recordingState === "recorded" && (
                  <>
                    <Button onClick={playAudio} size="lg" variant="outline">
                      <Play className="mr-2 w-4 h-4" />
                      Play
                    </Button>
                    <Button
                      onClick={discardRecording}
                      size="lg"
                      variant="outline"
                    >
                      <Trash2 className="mr-2 w-4 h-4" />
                      Discard
                    </Button>
                  </>
                )}

                {recordingState === "playing" && (
                  <Button onClick={pauseAudio} size="lg" variant="outline">
                    <Pause className="mr-2 w-4 h-4" />
                    Pause
                  </Button>
                )}
              </div>
            </div>
          </div>

          <audio ref={audioRef} style={{ display: "none" }} />
        </CardContent>
      </Card>

      {recordingState === "recorded" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Message Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Message Title *</Label>
              <Input
                id="title"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder="Enter message title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={messageDescription}
                onChange={(e) => setMessageDescription(e.target.value)}
                placeholder="Add a description for your voice message..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Recipients</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter email address"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addRecipient((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Enter email address"]'
                      ) as HTMLInputElement;
                      if (input && input.value) {
                        addRecipient(input.value);
                        input.value = "";
                      }
                    }}
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
                {recipients.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {recipients.map((email) => (
                      <Badge
                        key={email}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {email}
                        <button
                          onClick={() => removeRecipient(email)}
                          className="ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Badge className={getPriorityColor(priority)}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </Badge>
              <Button
                onClick={handleSend}
                disabled={!messageTitle || recipients.length === 0}
                size="lg"
              >
                <Send className="mr-2 w-4 h-4" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
