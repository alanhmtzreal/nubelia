"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

export interface CartItem {
  slug: string;
  name: string;
  price: number | null;
  image: string;
  aroma?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity: number, aroma?: string) => void;
  removeItem: (slug: string, aroma?: string) => void;
  updateQuantity: (slug: string, quantity: number, aroma?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "nubelia-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore corrupted storage
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = (product: Product, quantity: number, aroma?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === product.slug && i.aroma === aroma
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug && i.aroma === aroma
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          aroma,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, aroma?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.aroma === aroma))
    );
  };

  const updateQuantity = (slug: string, quantity: number, aroma?: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.aroma === aroma
          ? { ...i, quantity: Math.max(1, quantity) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
