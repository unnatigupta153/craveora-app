import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

export default function Home({ onLogout }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = localStorage.getItem('loggedInUser') || 'Guest';

  useEffect(() => {
    apiRequest('/products', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(setRestaurants)
      .catch((err) => { setError(err.message); if (err.message.toLowerCase().includes('token')) logout(); });
  }, []);

  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('loggedInUser'); onLogout(); navigate('/login', { replace: true }); };
  const visibleRestaurants = restaurants.filter((item) => `${item.name} ${item.cuisine}`.toLowerCase().includes(search.toLowerCase()) && (activeCategory === 'All' || item.cuisine.toLowerCase().includes(activeCategory.toLowerCase())));
  const categories = [['All', '✦'], ['Biryani', '🍛'], ['Pizza', '🍕'], ['Healthy', '🥗'], ['Asian', '🍜']];

  return <main className="delivery-app">
    <header className="delivery-nav"><div className="brand"><span className="brand-icon">✦</span><span>Craveora</span></div><div className="delivery-location"><span className="pin">⌖</span><div><small>Delivering to</small><strong>Home · New Delhi</strong></div><span className="chevron">⌄</span></div><div className="nav-actions"><span className="nav-greeting">Hi, {user}</span><button className="profile-button">{user.charAt(0).toUpperCase()}</button><button className="logout-link" onClick={logout}>Logout</button></div></header>
    <section className="delivery-hero"><div className="hero-copy"><p className="eyebrow light">GOOD FOOD, GOOD MOOD</p><h1>Cravings?<br /><em>Consider them handled.</em></h1><p>Discover the best food and drinks around you, delivered fresh to your door.</p><div className="delivery-search"><span>⌕</span><input aria-label="Search restaurants and dishes" placeholder="Search for dishes, restaurants or cuisines" value={search} onChange={(e) => setSearch(e.target.value)} /><kbd>⌘ K</kbd></div></div><div className="hero-food"><div className="hero-orbit">FAST<br /><strong>30 min</strong></div><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=85" alt="A colourful table of delicious food" /></div></section>
    <section className="category-row">{categories.map(([label, icon]) => <button key={label} className={activeCategory === label ? 'category active' : 'category'} onClick={() => setActiveCategory(label)}><span>{icon}</span>{label}</button>)}</section>
    <section className="delivery-content"><div className="restaurant-area"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Top picks near you</h2></div><button className="view-all">View all <span>→</span></button></div>{error ? <p className="error">{error}</p> : <div className="restaurant-grid">{visibleRestaurants.map((restaurant) => <article className="restaurant-card" key={restaurant.id}><div className="restaurant-image"><img src={restaurant.image} alt={restaurant.name} /><span className="offer-tag">{restaurant.tag}</span><button className="heart" aria-label={`Save ${restaurant.name}`}>♡</button></div><div className="restaurant-details"><div className="restaurant-title"><h3>{restaurant.name}</h3><span className="rating">★ {restaurant.rating}</span></div><p>{restaurant.cuisine}</p><div className="restaurant-meta"><span>⌁ {restaurant.eta}</span><span>₹{restaurant.price} for one</span></div><button className="order-button">Add to order <span>+</span></button></div></article>)}</div>}{!error && visibleRestaurants.length === 0 && <p className="muted empty-state">No delicious matches found. Try another search.</p>}</div><aside className="delivery-aside"><div className="aside-card live-order-card"><div className="live-order-head"><div><p className="eyebrow">LIVE DELIVERY</p><h3>Your order is on its way</h3></div><span className="live-pulse">● Live</span></div><div className="tracking-map"><span className="map-route" /><span className="map-pin start">●</span><span className="map-pin end">⌖</span><span className="delivery-bike">⌁</span></div><div className="tracking-info"><strong>Arriving in 18–22 min</strong><span>Rider is picking up your order</span></div><div className="progress-steps"><span className="done">✓</span><i className="filled" /><span className="current">●</span><i /><span>3</span></div><div className="step-labels"><span>Confirmed</span><span>On the way</span><span>Delivered</span></div></div><div className="aside-card order-card"><div className="aside-icon">♨</div><p className="eyebrow">YOUR NEXT MEAL</p><h3>Plan your perfect order</h3><p>Get free delivery on your first order today.</p><button className="primary-button">Explore offers <span>→</span></button></div><div className="aside-card promise-card"><div className="promise-row"><span className="promise-icon">✓</span><div><strong>Freshness promise</strong><p>Always fresh, always tasty.</p></div></div><div className="promise-row"><span className="promise-icon">⚡</span><div><strong>Lightning fast</strong><p>Track every minute.</p></div></div></div></aside></section>
  </main>;
}
