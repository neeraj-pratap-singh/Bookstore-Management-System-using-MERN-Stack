// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Add this to your existing server.js file
const authRoutes = require('./routes/authRoutes');
// Add this to your server.js
const bookRoutes = require('./routes/bookRoutes');
// Add this to your server.js
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies

// Use authRoutes with '/api/auth' prefix
app.use('/api/auth', authRoutes);

// Use bookRoutes with '/api/books' prefix
app.use('/api/books', bookRoutes);

// Use cartRoutes with '/api/cart' prefix
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
