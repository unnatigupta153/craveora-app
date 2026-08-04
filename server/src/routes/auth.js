const router = require('express').Router();
const { signup, login } = require('../controllers/auth');
const { validateSignup, validateLogin } = require('../middleware/validation');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
module.exports = router;
