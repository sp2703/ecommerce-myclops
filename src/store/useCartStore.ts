import { create } from 'zustand';
import { CartItem, Product } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalValue: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalValue: () => {
    const state = get();
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));