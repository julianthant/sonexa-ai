export default function CompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">Company</h1>
        <p className="text-gray-600">
          Manage your company settings and organizational structure.
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="mb-4 font-medium text-gray-900 text-lg">
            Company Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Company Name
              </label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Industry
              </label>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>Select industry</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Company Size
              </label>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>Select size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="mb-4 font-medium text-gray-900 text-lg">
            Organization Structure
          </h2>
          <div className="space-y-4">
            <div className="py-8 text-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                No organizational structure set up yet.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded-md text-white transition-colors">
                Set Up Structure
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="mb-4 font-medium text-gray-900 text-lg">
          Recent Activity
        </h2>
        <div className="py-8 text-center">
          <p className="text-gray-500">No recent company activity.</p>
        </div>
      </div>
    </div>
  );
}
