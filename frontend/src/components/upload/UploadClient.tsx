"use client";

import { VoiceUpload } from "@/components/voice/VoiceUpload";

interface UploadClientProps {
  organizationId: string;
}

export default function UploadClient({ organizationId }: UploadClientProps) {
  const handleUploadComplete = (voiceMessageId: string) => {
    console.log("Upload completed:", voiceMessageId);
    // You can add notifications, refresh data, etc.
  };

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error);
    // You can add error notifications here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Upload Voice Files</h1>
        <p className="text-gray-600">
          Upload and manage your voice message files. Supported formats include
          MP3, WAV, M4A, and more.
        </p>
      </div>

      {/* Voice Upload Component */}
      <VoiceUpload
        organizationId={organizationId}
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />

      {/* Upload Stats - Client Side */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Voice Files
              </p>
              <p className="font-bold text-gray-900 text-3xl">0</p>
              <p className="mt-1 text-blue-600 text-sm">All uploads</p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Processing
              </p>
              <p className="font-bold text-gray-900 text-3xl">0</p>
              <p className="mt-1 text-yellow-600 text-sm">In queue</p>
            </div>
            <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Completed
              </p>
              <p className="font-bold text-gray-900 text-3xl">0</p>
              <p className="mt-1 text-green-600 text-sm">
                Successfully processed
              </p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Storage Used
              </p>
              <p className="font-bold text-gray-900 text-3xl">0 MB</p>
              <p className="mt-1 text-purple-600 text-sm">Of available space</p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">Recent Uploads</h2>
        </div>
        <div className="p-6">
          <div className="py-8 text-center">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No uploads yet
            </h3>
            <p className="mb-4 text-gray-500">
              Start by uploading your first voice message file using the form
              above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
