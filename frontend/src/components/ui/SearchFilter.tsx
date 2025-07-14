"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  onSearchChange: (term: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  placeholder?: string;
  filters?: Array<{
    name: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
  showClearButton?: boolean;
}

export default function SearchFilter({
  onSearchChange,
  onFilterChange,
  placeholder = "Search...",
  filters = [],
  showClearButton = true,
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...activeFilters, [filterName]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value && value !== "all"
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pr-10 pl-10"
        />
        {searchTerm && showClearButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="top-1/2 right-2 absolute p-1 w-6 h-6 -translate-y-1/2 transform"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-4 sm:space-y-0">
          {filters.map((filter) => (
            <div key={filter.name} className="w-full sm:w-48">
              <Select
                value={activeFilters[filter.name] || "all"}
                onValueChange={(value) =>
                  handleFilterChange(filter.name, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || value === "all") return null;
            const filter = filters.find((f) => f.name === key);
            const option = filter?.options.find((o) => o.value === value);
            if (!option || !filter) return null;

            return (
              <div
                key={key}
                className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-md text-blue-800 text-sm"
              >
                <span>
                  {filter.label}: {option.label}
                </span>
                <button
                  onClick={() => handleFilterChange(key, "all")}
                  className="hover:bg-blue-200 ml-1 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
