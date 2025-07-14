export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Archive</h1>
        <p className="text-gray-600">
          Access your archived files and messages.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">Archived Items</h2>
          <div className="flex space-x-2">
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Filter
            </button>
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Sort by Date
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
                  d="M5 8l6 6m0 0l6-6m-6 6V4m-6 16h12a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No archived items
            </h3>
            <p className="text-gray-500">
              Items you archive will appear here for easy access.
            </p>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-medium text-gray-900 text-lg">
            Archive Settings
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="font-medium text-gray-700 text-sm">
                  Auto-archive old files
                </label>
                <p className="text-gray-500 text-xs">
                  Automatically archive files older than 90 days
                </p>
              </div>
              <button className="flex items-center bg-gray-200 rounded-full w-10 h-6 transition-colors">
                <div className="bg-white shadow-sm rounded-full w-4 h-4 transition-transform translate-x-1 transform"></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <label className="font-medium text-gray-700 text-sm">
                  Archive notifications
                </label>
                <p className="text-gray-500 text-xs">
                  Get notified when items are archived
                </p>
              </div>
              <button className="flex items-center bg-blue-600 rounded-full w-10 h-6 transition-colors">
                <div className="bg-white shadow-sm rounded-full w-4 h-4 transition-transform translate-x-5 transform"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-medium text-gray-900 text-lg">
            Storage Info
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Archived Files</span>
              <span className="font-medium">0 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available Storage</span>
              <span className="font-medium">10 GB</span>
            </div>
            <div className="bg-gray-200 rounded-full w-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
