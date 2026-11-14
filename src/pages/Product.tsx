import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { useShopStore } from '../store/useShopStore'
export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p=>p.id===id)
  const [size,setSize] = useState<number | null>(null)
  const [added,setAdded] = useState(false)
  const add = useShopStore(s=>s.addToCart)
  const saved = useShopStore(s=>product ? s.wishlist.includes(product.id) : false)
  const toggle = useShopStore(s=>s.toggleWishlist)
  const navigate = useNavigate()
  if (!product) return <div className="empty-state"><h2>PAIR NOT FOUND.</h2><Link to="/shop" className="button button-blue">BACK TO SHOP</Link></div>
  return <main className="product-detail light-section">
    <Link to="/shop" className="back-link"><ArrowLeft size={16}/> BACK TO SHOP</Link>
    <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name}/><span>STRYDE / PRODUCT NO. {product.id.toUpperCase()}</span></div><div className="detail-info"><div className="eyebrow dark-eyebrow">{product.brand} / {product.category}</div><h1>{product.name.toUpperCase()}<em>.</em></h1><div className="detail-price">₱{product.price.toLocaleString('en-PH')}</div><p>{product.description}</p><div className="detail-rule"/><div className="size-heading"><strong>SELECT SIZE</strong><span>US MEN'S</span></div><div className="size-grid">{product.sizes.map(n=><button key={n} className={size===n?'size selected':'size'} onClick={()=>{setSize(n);setAdded(false)}}>{n}</button>)}</div><button className="button button-blue add-button" disabled={!size} onClick={()=>{add(product.id,size!);setAdded(true)}}><ShoppingBag size={17}/>{added?'ADDED TO BAG':'ADD TO BAG — ₱'+product.price.toLocaleString('en-PH')}</button>{added&&<div className="inline-success">Added to your bag. <button onClick={()=>navigate('/cart')}>VIEW BAG →</button></div>}<button className="wishlist-detail" onClick={()=>toggle(product.id)}><Heart size={17} fill={saved?'currentColor':'none'}/>{saved?'SAVED TO WISHLIST':'ADD TO WISHLIST'}</button><div className="detail-rule"/><div className="detail-note"><strong>THE STRYDE STANDARD</strong><p>Authenticity matters. Every pair in our curated selection is reviewed before it reaches the rotation.</p></div></div></div>
  </main>
}
