require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');

const app = express();
const port = process.env.PORT || 4040;
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.get('/ping', (_req, res) => res.json({ success: true, message: 'PONG' }));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

async function start() {
  await connectDatabase();
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

if (require.main === module) start().catch((error) => { console.error('Server startup failed:', error.message); process.exit(1); });
module.exports = app;
