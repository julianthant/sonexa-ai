export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Favorites</h1>
        <p className="text-gray-600">
          Quick access to your favorite files and messages.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-b">
          <h2 className="font-medium text-gray-900 text-lg">Favorite Items</h2>
          <div className="flex space-x-2">
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Recently Added
            </button>
            <button className="hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md text-sm">
              Type
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 w-12 h-12 text-yellow-400">
              <svg
                className="w-full h-full"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No favorites yet
            </h3>
            <p className="mb-6 text-gray-500">
              Star files and messages to add them to your favorites for quick
              access.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors">
              Browse Files
            </button>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-medium text-gray-900 text-lg">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="hover:bg-gray-50 p-3 border border-gray-200 rounded-lg w-full text-left transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
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
                <span className="font-medium text-sm">Favorite Files</span>
              </div>
            </button>
            <button className="hover:bg-gray-50 p-3 border border-gray-200 rounded-lg w-full text-left transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm">Favorite Messages</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-medium text-gray-900 text-lg">
            Recent Favorites
          </h3>
          <div className="py-6 text-center">
            <p className="text-gray-500 text-sm">No recent favorites</p>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-medium text-gray-900 text-lg">Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Favorites</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Most Used</span>
              <span className="font-medium text-gray-400">-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
