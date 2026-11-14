import { useState } from 'react'\nimport { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, Heart, X } from 'lucide-react'
import { useShopStore } from '../store/useShopStore'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const count = useShopStore(s => s.cart.reduce((n, x) => n + x.quantity, 0))
  const links = [['Shop','/shop'],['Brands','/brands'],['Collections','/collections'],['Journal','/journal']]
  return <>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER ₱8,000 <span>—</span> BUILT FOR THE CULTURE</div>
    <motion.header className="site-header" initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <Link to="/" className="wordmark">STRYDE<span>.</span></Link>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        {links.map(([label,path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search/></button>
        <Link className="icon-btn" aria-label="Wishlist" to="/wishlist"><Heart/></Link>
        <Link className="icon-btn bag-link" aria-label="Shopping bag" to="/cart"><ShoppingBag/>{count > 0 && <b>{count}</b>}</Link>
      </div>
    </motion.header>
    <AnimatePresence>{searchOpen && <motion.form initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: .22 }} className="search-strip" onSubmit={e => {e.preventDefault(); location.href = `/shop?q=${encodeURIComponent(query)}`}}>
      <Search size={18}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sneakers, brands, styles..." aria-label="Search products"/><button className="text-btn">SEARCH <span>↗</span></button>
    </form>}
  </>
}
