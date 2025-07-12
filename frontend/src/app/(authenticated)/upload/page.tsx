export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Upload Files</h1>
        <p className="text-gray-600">
          Upload and manage your documents and media files.
        </p>
      </div>

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
