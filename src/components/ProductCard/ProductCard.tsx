"use client";

import { useCallback } from "react";
import { useStore } from "@/store/useStore";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useRouter } from "next/router";
import { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductActions } from "./ProductActions";
import { analyticsInstance } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { userId, addToCart, toggleFavorite } = useStore();
  const { trackAddToCart, trackAddToFavorites } = useAnalytics(userId);

  const router = useRouter();

  const handleClick = () => {
    const urlFriendlyName = product.id.toLowerCase().replace(/\s+/g, "-");
    router.push(`/product/${urlFriendlyName}`);
  };
  const handleAddToCart = useCallback(() => {
    console.log("userId", userId);
    if (userId) {
      trackAddToCart(product);
      addToCart(product);
    }
  }, [userId, product, addToCart, trackAddToCart]);

  const handleAddToFavorites = useCallback(() => {
    if (userId) {
      trackAddToFavorites(product);
      toggleFavorite(product);
    }
  }, [userId, product, toggleFavorite, trackAddToFavorites]);

  return (
    <div className="card group block">
      <div
        className="relative overflow-hidden rounded-t-xl"
        onClick={handleClick}
      >
        <ProductImage src={product.image} alt={product.name} />
        {product.featured && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <ProductInfo product={product} />
        <ProductActions
          onAddToCart={handleAddToCart}
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
    </div>
  );
}
