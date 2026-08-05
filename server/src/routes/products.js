const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => res.json([
  { id: 1, name: 'Spice Route Biryani', cuisine: 'Biryani · North Indian', price: 299, rating: '4.8', eta: '25–30 min', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'The Pizza Lab', cuisine: 'Pizza · Italian', price: 449, rating: '4.7', eta: '30–35 min', tag: '20% OFF', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Green Bowl Co.', cuisine: 'Healthy · Salads', price: 349, rating: '4.6', eta: '20–25 min', tag: 'Healthy pick', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Wok This Way', cuisine: 'Asian · Chinese', price: 399, rating: '4.5', eta: '35–40 min', tag: 'New', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85' }
]));

module.exports = router;
