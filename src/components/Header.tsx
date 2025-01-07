"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import SearchBar from "./SearchBar";

export default function Header() {
  const { userId, cart, favorites } = useStore();

  const handleNavClick = () => {
    if (userId) {
      // analyticsInstance.({ userId });
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={handleNavClick}>
            <h1 className="text-2xl font-bold">E-Shop</h1>
          </Link>

          <SearchBar />

          <nav className="flex items-center gap-6">
            <Link href="/favorites" onClick={handleNavClick}>
              Favorites ({favorites.length})
            </Link>
            <Link href="/cart" onClick={handleNavClick}>
              Cart ({cart.length})
            </Link>
            {!userId && (
              <Link href="/signup" onClick={handleNavClick}>
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
