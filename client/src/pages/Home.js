import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

export default function Home({ onLogout }) {
  const [products, setProducts] = useState([]); const [error, setError] = useState(''); const navigate = useNavigate(); const user = localStorage.getItem('loggedInUser');
  useEffect(() => { apiRequest('/products', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(setProducts).catch(err => { setError(err.message); if (err.message.toLowerCase().includes('token')) logout(); }); }, []);
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('loggedInUser'); onLogout(); navigate('/login', { replace: true }); };
  return <main className="dashboard"><div className="topbar"><div><p className="eyebrow">DASHBOARD</p><h1>Hi, {user}</h1></div><button className="secondary" onClick={logout}>Logout</button></div><section className="panel"><h2>Products</h2><p className="muted">Protected data loaded from your Express API.</p>{error ? <p className="error">{error}</p> : <div className="products">{products.map(product => <article className="product" key={product.name}><span>{product.name}</span><strong>₹{product.price.toLocaleString('en-IN')}</strong></article>)}</div>}</section></main>;
}
