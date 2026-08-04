const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => res.json([
  { name: 'Mobile', price: 10000 },
  { name: 'TV', price: 20000 }
]));

module.exports = router;
