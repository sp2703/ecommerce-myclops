import React from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { analyticsInstance } from "../lib/analytics";
import { mockProducts } from "../data/mockProducts";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = useAuthStore((state) => state.userId);
  const addItem = useCartStore((state) => state.addItem);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (userId) {
      analyticsInstance.addToCart({
        userId,
        productId: product.id,
        productCost: product.price,
        currency: product.currency,
        productName: product.name,
      });
      addItem(product);
    }
  };

  const handleAddToFavorites = () => {
    if (userId) {
      analyticsInstance.addToFavourites({
        userId,
        pageUrl: window.location.href,
        productName: product.name,
        productId: product.id,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: product.currency,
              })}
            </p>
            <div className="space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToFavorites}
                className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
