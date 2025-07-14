export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Files</h1>
        <p className="text-gray-600">
          Browse and manage your uploaded files and documents.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">All Files</h2>
          <div className="flex space-x-2">
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Filter
            </button>
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Sort
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 w-12 h-12 text-gray-400">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No files found
            </h3>
            <p className="mb-6 text-gray-500">
              Upload some files to get started.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors">
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
