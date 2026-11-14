export type Product = {
  id: string
  name: string
  brand: string
  category: string
  color: string
  price: number
  compareAt?: number
  badge?: string
  image: string
  description: string
  sizes: number[]
  featured?: boolean
}
export type CartLine = { productId: string; size: number; quantity: number }
