"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "action" | "message" | "file" | "user";
  url?: string;
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Create New Message",
          description: "Start a new conversation",
          type: "action",
          url: "/create-message",
        },
        {
          id: "2",
          title: "Upload Files",
          description: "Upload documents and media",
          type: "action",
          url: "/upload",
        },
        {
          id: "3",
          title: "Team Collaboration",
          description: "Manage team settings",
          type: "action",
          url: "/collaboration",
        },
      ];

      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder="Search actions, messages, files..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className="py-2 pr-4 pl-10 border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Search Results */}
      {(searchResults.length > 0 || isSearching) && (
        <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-1 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-gray-500 text-center">
              <div className="mx-auto border-b-2 border-blue-600 rounded-full w-6 h-6 animate-spin"></div>
              <span className="block mt-2 text-sm">Searching...</span>
            </div>
          ) : (
            <div className="py-2">
              {searchResults.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block hover:bg-gray-50 px-4 py-3 border-gray-100 border-b last:border-b-0"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex justify-center items-center bg-blue-100 rounded-lg w-8 h-8">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {result.title}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
