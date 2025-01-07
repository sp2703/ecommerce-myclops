"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
//
export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { userId } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && searchTerm) {
      analyticsInstance.trackSearch({ userId, searchTerm });
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
