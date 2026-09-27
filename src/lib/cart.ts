export type CartItem = {
  quantity: number;
  size: string;
  color: string;
};

export const CART_KEY = "therma-cart-v1";

export function readCart(): CartItem | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(CART_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as CartItem;
  } catch {
    window.localStorage.removeItem(CART_KEY);
    return null;
  }
}

export function writeCart(cart: CartItem | null) {
  if (typeof window === "undefined") return;
  if (cart) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  else window.localStorage.removeItem(CART_KEY);
}