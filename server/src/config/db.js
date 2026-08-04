const mongoose = require('mongoose');

async function connectDatabase() {
  if (!process.env.MONGO_CONN) throw new Error('MONGO_CONN is not configured');
  await mongoose.connect(process.env.MONGO_CONN, { serverSelectionTimeoutMS: 10000 });
  console.log('MongoDB connected');
}

module.exports = connectDatabase;
