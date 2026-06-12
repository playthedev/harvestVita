'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import type { Product } from './products';

export type CartItem = Product & { qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product) => void;
  addMany: (product: Product, qty: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = 'hv_cart';

function readInitialCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Always start with [] so server and client first-render match (no hydration mismatch).
  // Load from localStorage after mount in an effect.
  const [items, setItems] = useState<CartItem[]>([]);
  const hydratedRef = useRef(false);

  useEffect(() => {
    // Hydrate from localStorage once on mount, before any user interaction.
    // Deliberately synchronous: server and first client render must both produce
    // [] to avoid a hydration mismatch, so the real value can only be applied here.
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      const stored = readInitialCart();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored.length > 0) setItems(stored);
    }
  }, []);

  // Sync to localStorage after hydration — skip the initial empty state.
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or unavailable — ignore
    }
  }, [items]);

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const addMany = useCallback((product: Product, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, total, add, addMany, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
