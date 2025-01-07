import { useCallback } from "react";
import SDK from "../myclops-1.0.0.esm.js";
import { Product } from "@/types/product";

const MyclopsAnalytics = new SDK();
export function useAnalytics(userId: string | null) {
  const trackAddToCart = useCallback(
    (product: Product) => {
      console.log("useAnalytics", product);
      if (userId) {
        MyclopsAnalytics.init({
          userId,
          productId: product.id,
          productCost: product.price,
          currency: product.currency,
          productName: product.name,
        });
      }
    },
    [userId]
  );

  const trackAddToFavorites = useCallback(
    (product: Product) => {
      if (userId) {
        MyclopsAnalytics.addToFavourites({
          userId,
          productId: product.id,
          pageUrl: window.location.href,
          productName: product.name,
        });
      }
    },
    [userId]
  );

  const trackFeatureProducts = useCallback(
    (product: Product) => {
      if (userId) {
        MyclopsAnalytics.trackFeatureProduct({
          userId,
          productId: product.id,
          productCost: product.price,
          currency: product.currency,
          productName: product.name,
        });
      }
    },
    [userId]
  );

  return {
    trackAddToCart,
    trackAddToFavorites,
    trackFeatureProducts,
  };
}
