const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(409).json({ success: false, message: 'User already exists. Please login.' });
    await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to create account' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Email or password is incorrect' });
    }
    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, message: 'Login successful', jwtToken, email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to login' });
  }
}

module.exports = { signup, login };
