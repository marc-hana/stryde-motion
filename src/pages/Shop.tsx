import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
export default function Shop() {
  const [params] = useSearchParams()
  const [brand,setBrand] = useState('All')
  const [category,setCategory] = useState('All')
  const [sort,setSort] = useState('featured')
  const [query,setQuery] = useState(params.get('q') ?? '')
  const brands = ['All',...new Set(products.map(p=>p.brand))]
  const categories = ['All',...new Set(products.map(p=>p.category))]
  const shown = useMemo(() => products.filter(p => (brand==='All'||p.brand===brand) && (category==='All'||p.category===category) && `${p.name} ${p.brand} ${p.color}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:0),[brand,category,sort,query])
  return <main className="shop-page light-section">
    <div className="shop-intro"><div className="eyebrow dark-eyebrow">THE STRYDE SELECTION / 2026</div><h1>THE <em>ROTATION.</em></h1><p>Considered pairs. Iconic design. Find the next essential for your rotation.</p></div>
    <div className="shop-toolbar"><div className="filter-row"><input className="filter-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sneakers..."/><select value={brand} onChange={e=>setBrand(e.target.value)} aria-label="Filter by brand">{brands.map(x=><option key={x}>{x}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter by category">{categories.map(x=><option key={x}>{x}</option>)}</select></div><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Sort: Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option></select></div>
    <div className="results-count">{shown.length} PRODUCTS <span> / </span> CURATED FOR THE CULTURE</div>
    {shown.length ? <div className="product-grid shop-grid">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><h2>NO PAIRS FOUND.</h2><p>Try a different search or clear your filters.</p><button className="button button-blue" onClick={()=>{setQuery('');setBrand('All');setCategory('All')}}>CLEAR FILTERS</button></div>}
  </main>
}
