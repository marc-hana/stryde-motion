import { Heart, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../types'
import { useShopStore } from '../store/useShopStore'
export default function ProductCard({ product }: { product: Product }) {
  const saved = useShopStore(s => s.wishlist.includes(product.id))
  const toggle = useShopStore(s => s.toggleWishlist)
  return <motion.article className="product-card" whileHover={{ y: -6 }} transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}>
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`}><motion.img src={product.image} alt={product.name} loading="lazy" whileHover={{ scale: 1.075 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}/></Link>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <motion.button className={`save-btn ${saved ? 'saved' : ''}`} onClick={() => toggle(product.id)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} whileTap={{ scale: .82 }}><Heart size={18} fill={saved ? 'currentColor' : 'none'}/></motion.button>
      <Link className="quick-view" to={`/product/${product.id}`}>VIEW PRODUCT <ArrowUpRight size={15}/></Link>
    </div>
    <div className="product-meta"><span>{product.brand}</span><span>{product.category}</span></div>
    <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
    <div className="product-price">₱{product.price.toLocaleString('en-PH')}</div>
  </motion.article>
}
