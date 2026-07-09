import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Division } from "./api";

export interface CartItem {
  key: string; // `${division}:${name}` — stable identity for add/remove/dedupe
  division: Division;
  name: string;
  docs: string[];
}

const STORAGE_KEY = "skywalkers_cart";

interface CartContextValue {
  items: CartItem[];
  add: (item: Omit<CartItem, "key">) => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (division: Division, name: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable (e.g. private browsing) — cart just won't persist across reloads.
    }
  }, [items]);

  function add(item: Omit<CartItem, "key">) {
    const key = `${item.division}:${item.name}`;
    setItems((cur) => (cur.some((c) => c.key === key) ? cur : [...cur, { ...item, key }]));
  }

  function remove(key: string) {
    setItems((cur) => cur.filter((c) => c.key !== key));
  }

  function clear() {
    setItems([]);
  }

  function has(division: Division, name: string) {
    return items.some((c) => c.key === `${division}:${name}`);
  }

  return <CartContext.Provider value={{ items, add, remove, clear, has }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
