"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image?: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isSaved: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cv-wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore — start with an empty wishlist
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cv-wishlist", JSON.stringify(items));
  }, [items]);

  function toggleItem(item: WishlistItem) {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }

  function isSaved(id: string) {
    return items.some((i) => i.id === id);
  }

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isSaved, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
