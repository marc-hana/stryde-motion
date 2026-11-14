import { ArrowUpRight, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1] as const

export default function Home() {
  return <main>
    <section className="hero">
      <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } } }}>
        <motion.div className="eyebrow" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .65, ease } } }}><i/> THE CULTURE MOVES FORWARD</motion.div>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 38, skewY: 2 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: .9, ease } } }}>STEP INTO<br/><em>WHAT'S NEXT.</em></motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease } } }}>Not just what you wear. It's how you move. Discover the pairs shaping the streets and the stories behind them.</motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease } } }}><Link className="button button-blue" to="/shop">EXPLORE THE DROP <ArrowUpRight size={17}/></Link></motion.div>
        <motion.div className="hero-index" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .8 } } }}>01 / 04 <span>—</span> NEW SEASON EDITION</motion.div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.08 }} animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }} transition={{ duration: 1.15, ease, delay: .18 }}>
        <motion.img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=90" alt="Statement sneaker in studio lighting" initial={{ scale: 1.2 }} animate={{ scale: 1.02 }} transition={{ duration: 1.8, ease }}/>
        <motion.div className="hero-stamp" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .95, duration: .65, ease }}>STRYDE<br/><span>EST. MMXXIV</span></motion.div>
        <div className="hero-vertical">SNEAKER CULTURE · NO LIMITS · SNEAKER CULTURE · NO LIMITS</div>
      </motion.div>
    </section>
    <section className="ticker"><div>BUILT FOR THE EVERYDAY <b>✳</b> MADE FOR THE UNEXPECTED <b>✳</b> NEVER STANDING STILL <b>✳</b> BUILT FOR THE EVERYDAY <b>✳</b></div></section>
    <section className="section light-section">
      <Reveal><div className="section-heading"><div><div className="eyebrow dark-eyebrow">01 — THE LATEST ROTATION</div><h2>FRESH <em>OFF THE LINE.</em></h2></div><Link className="under-link" to="/shop">SHOP ALL SNEAKERS <MoveRight size={18}/></Link></div></Reveal>
      <motion.div className="product-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .09 } } }}>
        {products.filter(p => p.featured).map(p => <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: .65, ease } } }}><ProductCard product={p}/></motion.div>)}
      </motion.div>
    </section>
    <section className="campaign">
      <Reveal className="campaign-image"><img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1500&q=85" alt="Streetwear editorial campaign"/></Reveal>
      <Reveal className="campaign-copy" delay={.12}><div className="eyebrow"><i/> THE STRYDE EDIT</div><h2>MORE THAN<br/><em>A SILHOUETTE.</em></h2><p>Culture is never on pause. Explore the people, places and pairs moving the scene forward.</p><Link className="button button-outline" to="/journal">READ THE JOURNAL <ArrowUpRight size={17}/></Link><span className="campaign-number">02 / CULTURE</span></Reveal>
    </section>
    <Reveal><section className="brand-band"><div className="eyebrow dark-eyebrow">THE NAMES THAT MOVE US</div><div className="brand-list"><span>NIKE</span><span>adidas</span><span>NEW BALANCE</span><span>ASICS</span><span>PUMA</span></div><Link to="/brands" className="under-link">DISCOVER ALL BRANDS <MoveRight size={18}/></Link></section></Reveal>
    <Reveal><section className="newsletter"><div><div className="eyebrow"><i/> STAY IN THE LOOP</div><h2>DON'T MISS<br/><em>YOUR MOMENT.</em></h2></div><form onSubmit={e => {e.preventDefault(); alert('Thanks for joining the STRYDE list. Connect a mailing provider to enable subscriptions.')}}><label htmlFor="email">DROP ALERTS. CULTURE NOTES. FIRST ACCESS.</label><div className="email-field"><input id="email" type="email" required placeholder="Your email address"/><button aria-label="Subscribe"><ArrowUpRight/></button></div><small>By subscribing, you agree to receive STRYDE updates.</small></form></section></Reveal>
  </main>
}
