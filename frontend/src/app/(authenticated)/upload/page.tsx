import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Files - Sonexa AI",
  description: "Upload and manage your documents and media files.",
};

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Upload Files</h1>
        <p className="text-gray-600">
          Upload and manage your documents and media files.
        </p>
      </div>

      {/* Upload Stats - Server Side */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">
                Total Files
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
                Storage Used
              </p>
              <p className="font-bold text-gray-900 text-3xl">0 MB</p>
              <p className="mt-1 text-orange-600 text-sm">Current usage</p>
            </div>
            <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
              <svg
                className="w-6 h-6 text-orange-600"
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

      {/* File Upload Area - This would be enhanced with client-side functionality */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="p-12 border-2 border-gray-300 border-dashed rounded-lg text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg
                className="w-full h-full"
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
            <div>
              <h3 className="font-medium text-gray-900 text-lg">
                Upload files
              </h3>
              <p className="text-gray-500">
                Drag and drop files here, or click to select files
              </p>
              <p className="mt-2 text-gray-400 text-sm">
                Supports: Audio files (MP3, WAV, M4A), Documents (PDF, DOCX),
                Images
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors">
              Choose Files
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">Recent Uploads</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center">No files uploaded yet.</p>
        </div>
      </div>
    </div>
  );
}
