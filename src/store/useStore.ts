import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  userId: string | null;
  cart: CartItem[];
  favorites: Product[];
  setUserId: (id: string) => void;
  addToCart: (product: Product) => void;
  addToFavourites: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  userId: "12",
  cart: [],
  favorites: [],
  setUserId: (id) => set({ userId: id }),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  addToFavourites: (product) =>
    set((state) => {
      const existingItem = state.favorites.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        return { favorites: state.favorites };
      }
      return { favorites: [...state.favorites, product] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  toggleFavorite: (product) =>
    set((state) => {
      const isFavorite = state.favorites.some((p) => p.id === product.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((p) => p.id !== product.id)
          : [...state.favorites, product],
      };
    }),
  clearCart: () => set({ cart: [] }),
}));
