const mongoose = require('mongoose');
const mango_url = process.env.MONGO_CONN;
console.log('debug - mango_url is:', mango_url);
mongoose.connect(mango_url)
.then(() => {
console.log('MongoDB connected....');
}).catch((err) => {
console.error('MongoDB Connection Error:', err);
});