import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLine } from '../types'

type ShopState = {
  cart: CartLine[]
  wishlist: string[]
  addToCart: (productId: string, size: number) => void
  updateQuantity: (productId: string, size: number, quantity: number) => void
  removeFromCart: (productId: string, size: number) => void
  toggleWishlist: (productId: string) => void
  clearCart: () => void
}
export const useShopStore = create<ShopState>()(persist((set) => ({
  cart: [], wishlist: [],
  addToCart: (productId, size) => set(s => {
    const existing = s.cart.find(x => x.productId === productId && x.size === size)
    return { cart: existing ? s.cart.map(x => x === existing ? { ...x, quantity: x.quantity + 1 } : x) : [...s.cart, { productId, size, quantity: 1 }] }
  }),
  updateQuantity: (productId, size, quantity) => set(s => ({ cart: quantity < 1 ? s.cart.filter(x => !(x.productId === productId && x.size === size)) : s.cart.map(x => x.productId === productId && x.size === size ? { ...x, quantity } : x) })),
  removeFromCart: (productId, size) => set(s => ({ cart: s.cart.filter(x => !(x.productId === productId && x.size === size)) })),
  toggleWishlist: (productId) => set(s => ({ wishlist: s.wishlist.includes(productId) ? s.wishlist.filter(x => x !== productId) : [...s.wishlist, productId] })),
  clearCart: () => set({ cart: [] })
}), { name: 'stryde-shop-v1' }))
