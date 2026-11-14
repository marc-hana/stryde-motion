import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import Cart from './pages/Cart'
import { Wishlist, Brands, Collections, Journal, Account, Checkout, Admin } from './pages/Info'

export default function App() {
  const location = useLocation()
  return <>
    <Header/>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname + location.search}
        initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
        <Routes location={location}>
          <Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/brands" element={<Brands/>}/><Route path="/collections" element={<Collections/>}/><Route path="/journal" element={<Journal/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/>
          <Route path="/account" element={<Account/>}/><Route path="/orders" element={<Account/>}/><Route path="/admin/*" element={<Admin/>}/>
          <Route path="*" element={<main className="empty-state"><h2>PAGE NOT FOUND.</h2><a className="button button-blue" href="/">BACK HOME</a></main>}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
    <Footer/>
  </>
}
