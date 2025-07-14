export default function DownloadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Downloads</h1>
        <p className="text-gray-600">
          Access and manage your downloaded files and exports.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">
            Download History
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-sm transition-colors">
            Clear History
          </button>
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No downloads yet
            </h3>
            <p className="text-gray-500">
              Your downloaded files will appear here.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="mb-4 font-medium text-gray-900 text-lg">
          Quick Downloads
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <button className="hover:bg-gray-50 p-4 border border-gray-200 rounded-lg text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-8 h-8">
                <svg
                  className="w-4 h-4 text-blue-600"
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
              <div>
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-gray-500 text-sm">Download your data</p>
              </div>
            </div>
          </button>

          <button className="hover:bg-gray-50 p-4 border border-gray-200 rounded-lg text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-8 h-8">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a4 4 0 014-4h2.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a4 4 0 01-4 4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Reports</h3>
                <p className="text-gray-500 text-sm">Download reports</p>
              </div>
            </div>
          </button>

          <button className="hover:bg-gray-50 p-4 border border-gray-200 rounded-lg text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-8 h-8">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Backup</h3>
                <p className="text-gray-500 text-sm">Download backup</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
