/** Shipping rules — single source of truth for client display and server charging. */

/** Orders at or above this INR subtotal ship free. */
export const FREE_SHIPPING_THRESHOLD = 999;

/** Flat shipping fee (INR) charged below the free-shipping threshold. */
export const SHIPPING_FEE = 60;

/** Shipping cost for a given INR subtotal. */
export function calcShipping(subtotalInr: number): number {
  return subtotalInr >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
