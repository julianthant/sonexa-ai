"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HelpSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative mx-auto max-w-2xl">
      <Search className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
      <Input
        type="text"
        placeholder="Search for help articles, guides, or features..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-3 pl-12 text-lg"
      />
    </div>
  );
}
