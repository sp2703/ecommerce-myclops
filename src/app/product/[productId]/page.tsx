"use client";

import { useState, useEffect } from "react";
import SDK from "../../../myclops-1.0.0.esm.js";
import { analyticsInstance } from "@/lib/analytics";
import { mockProducts } from "@/lib/mockData";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  currency: string;
  category: string;
}

// Mock product data - replace with your actual data fetching logic

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const { userId, addToCart, toggleFavorite, addToFavourites } = useStore();
  useEffect(() => {
    // Simulate API call - replace with your actual data fetching
    const fetchProduct = () => {
      const foundProduct = mockProducts.find(
        (product) => product.id === params.productId
      );
      //   const foundProduct = mockProducts[params.productId];
      if (foundProduct) {
        setProduct(foundProduct);
        // Track product view
        analyticsInstance.trackFeatureProduct({
          productId: foundProduct.id,
          productName: foundProduct.name,
          productCost: foundProduct.price,
          currency: foundProduct.currency,
          userId, // Replace with actual user ID
        });
      }
    };

    fetchProduct();
  }, [params.productId]);

  const handleAddToCart = () => {
    if (product) {
      analyticsInstance.addToCart({
        productId: product.id,
        productName: product.name,
        productCost: product.price,
        currency: product.currency,
        userId: "test-user", // Replace with actual user ID
      });
      addToCart(product);
      toast.success("Added to Cart!");
    }
  };

  const handleAddToFavorites = () => {
    if (product) {
      analyticsInstance.addToFavourites({
        productId: product.id,
        productName: product.name,
        pageUrl: window.location.href,
        userId: "test-user", // Replace with actual user ID
      });
      toggleFavorite(product);
      addToFavourites(product);
      toast.success("Updated favorites!");
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {product.currency} {product.price.toFixed(2)}
            </p>
            <p className="text-gray-500 mb-6">{product.description}</p>
            <div className="space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToFavorites}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
