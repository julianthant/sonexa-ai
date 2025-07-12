"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  File,
  CheckCircle,
  AlertCircle,
  X,
  Play,
  Pause,
  Volume2,
  Download,
  Trash2,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  result?: {
    duration: number;
    transcription: string;
    aiAnalysis: string;
    classification: "accepted" | "rejected" | "quarantined";
    confidence: number;
  };
}

export function VoiceUploadClient() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading" as const,
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".ogg", ".flac"],
    },
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        // Simulate processing
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? { ...file, status: "processing", progress: 100 }
              : file
          )
        );

        // Simulate completion after processing
        setTimeout(() => {
          const mockResults = [
            {
              duration: 45,
              transcription:
                "Hi, I need help with my account setup. Can someone call me back?",
              aiAnalysis:
                "Customer requesting account assistance. Polite tone, high urgency.",
              classification: "accepted" as const,
              confidence: 95,
            },
            {
              duration: 32,
              transcription:
                "Thank you for the great service! Everything is working perfectly.",
              aiAnalysis:
                "Positive feedback about service quality. Happy customer.",
              classification: "accepted" as const,
              confidence: 98,
            },
            {
              duration: 67,
              transcription:
                "I am having trouble with the billing system. This is very frustrating.",
              aiAnalysis: "Billing issue reported. Customer sounds frustrated.",
              classification: "quarantined" as const,
              confidence: 87,
            },
          ];

          const randomResult =
            mockResults[Math.floor(Math.random() * mockResults.length)];

          setUploadedFiles((prev) =>
            prev.map((file) =>
              file.id === fileId
                ? { ...file, status: "completed", result: randomResult }
                : file
            )
          );

          toast.success("Voice message processed successfully!");
        }, 2000);
      } else {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const retryUpload = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, status: "uploading", progress: 0 }
          : file
      )
    );
    simulateUpload(fileId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "accepted":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      case "quarantined":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card className="border-2 border-gray-300 hover:border-gray-400 border-dashed transition-colors">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`text-center cursor-pointer transition-colors ${
              isDragActive ? "bg-blue-50" : ""
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center bg-blue-100 rounded-full w-16 h-16">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  {isDragActive
                    ? "Drop your audio files here"
                    : "Drag & drop audio files here"}
                </h3>
                <p className="mb-4 text-gray-600">
                  or click to browse and select files
                </p>
                <div className="text-gray-500 text-sm">
                  <p>Supported formats: MP3, WAV, M4A, OGG, FLAC</p>
                  <p>Maximum file size: 50MB • Maximum files: 10</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                <Upload className="mr-2 w-4 h-4" />
                Select Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Queue */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Upload Queue</span>
              <Badge variant="secondary">
                {uploadedFiles.length} file
                {uploadedFiles.length !== 1 ? "s" : ""}
              </Badge>
            </CardTitle>
            <CardDescription>
              Track the progress of your voice message uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <File className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {uploadFile.file.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`${getStatusColor(
                          uploadFile.status
                        )} border`}
                      >
                        {uploadFile.status === "uploading" && (
                          <RefreshCw className="mr-1 w-3 h-3 animate-spin" />
                        )}
                        {uploadFile.status === "processing" && (
                          <RefreshCw className="mr-1 w-3 h-3 animate-spin" />
                        )}
                        {uploadFile.status === "completed" && (
                          <CheckCircle className="mr-1 w-3 h-3" />
                        )}
                        {uploadFile.status === "error" && (
                          <AlertCircle className="mr-1 w-3 h-3" />
                        )}
                        {uploadFile.status.charAt(0).toUpperCase() +
                          uploadFile.status.slice(1)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {(uploadFile.status === "uploading" ||
                    uploadFile.status === "processing") && (
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-gray-600 text-sm">
                        <span>
                          {uploadFile.status === "uploading"
                            ? "Uploading..."
                            : "Processing..."}
                        </span>
                        <span>{Math.round(uploadFile.progress)}%</span>
                      </div>
                      <Progress value={uploadFile.progress} className="h-2" />
                    </div>
                  )}

                  {uploadFile.status === "completed" && uploadFile.result && (
                    <div className="space-y-3">
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">
                            Duration:
                          </span>
                          <p className="text-gray-600">
                            {uploadFile.result.duration}s
                          </p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">
                            Classification:
                          </span>
                          <div className="mt-1">
                            <Badge
                              className={getClassificationColor(
                                uploadFile.result.classification
                              )}
                            >
                              {uploadFile.result.classification}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">
                            Confidence:
                          </span>
                          <p className="text-gray-600">
                            {uploadFile.result.confidence}%
                          </p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Transcription:
                        </span>
                        <p className="bg-gray-50 mt-1 p-3 rounded text-gray-600">
                          "{uploadFile.result.transcription}"
                        </p>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          AI Analysis:
                        </span>
                        <p className="bg-blue-50 mt-1 p-3 rounded text-gray-600">
                          {uploadFile.result.aiAnalysis}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 w-4 h-4" />
                          Play Audio
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}

                  {uploadFile.status === "error" && (
                    <div className="flex justify-between items-center">
                      <p className="text-red-600 text-sm">
                        Upload failed. Please try again.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryUpload(uploadFile.id)}
                      >
                        <RefreshCw className="mr-2 w-4 h-4" />
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-900">
                Supported Formats
              </h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• MP3 files (.mp3)</li>
                <li>• WAV files (.wav)</li>
                <li>• M4A files (.m4a)</li>
                <li>• OGG files (.ogg)</li>
                <li>• FLAC files (.flac)</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-900">
                Processing Features
              </h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Automatic speech-to-text transcription</li>
                <li>• AI-powered content analysis</li>
                <li>• Automatic classification (accept/reject/quarantine)</li>
                <li>• Sentiment analysis and confidence scoring</li>
                <li>• Real-time processing status updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
