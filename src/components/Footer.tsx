import { Link } from 'react-router-dom'
export default function Footer() {
  return <footer className="footer">
    <div className="footer-top"><div><Link to="/" className="wordmark">STRYDE<span>.</span></Link><p>SNEAKER CULTURE. NO LIMITS.</p></div><div className="footer-links"><Link to="/shop">Shop all</Link><Link to="/brands">Brands</Link><Link to="/journal">Journal</Link><Link to="/account">My account</Link></div><div className="footer-note">THE NEXT STEP<br/><strong>IS YOURS.</strong></div></div>
    <div className="footer-bottom"><span>© 2026 STRYDE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE MOVEMENT.</span><span>PHILIPPINES · ₱ PHP</span></div>
  </footer>
}
