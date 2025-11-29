import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  price: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        // Subscription model: only one plan in the cart at a time.
        // If a new plan is added, it replaces the old one.
        return { items: [item] };
      }),
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
    }
  )
);
