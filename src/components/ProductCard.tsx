"use client";

import { Product } from "@/types/product";
import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { userId, addToCart, toggleFavorite, addToFavourites } = useStore();

  const router = useRouter();

  const handleClick = () => {
    const urlFriendlyName = product.id.toLowerCase().replace(/\s+/g, "-");
    router.push(`/product/${urlFriendlyName}`);
  };

  const handleAddToCart = () => {
    console.log("userId", userId);
    if (userId) {
      analyticsInstance.addToCart({
        userId,
        productId: product.id,
        productCost: product.price,
        currency: product.currency,
        productName: product.name,
      });
      addToCart(product);
      toast.success("Added to cart!");
    }
  };

  const handleAddToFavorites = () => {
    if (userId) {
      analyticsInstance.addToFavourites({
        userId,
        productId: product.id,
        pageUrl: window.location.href,
        productName: product.name,
      });
      toggleFavorite(product);
      addToFavourites(product);
      toast.success("Updated favorites!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md cursor-pointer"
        onClick={handleClick}
      />
      <h3
        className="mt-4 text-lg font-semibold cursor-pointer"
        onClick={handleClick}
      >
        {product.name}
      </h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 text-xl font-bold">
        {product.price} {product.currency}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToFavorites}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
