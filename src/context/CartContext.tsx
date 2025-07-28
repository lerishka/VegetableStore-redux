import { useContext, createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Good } from "../types/good";

type CartItem = Good & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Good, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  getQuantityById: (id: number) => number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Good, quantity = 1): void => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: number): void => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const getQuantityById = (id: number): number => {
    const item = cart.find((item) => item.id === id);
    return item?.quantity ?? 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getQuantityById }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext is not found");
  }

  return context;
};
