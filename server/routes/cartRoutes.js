// routes/cartRoutes.js
const express = require('express');
const { addBookToCart, getCart, updateBookQuantityInCart, removeBookFromCart } = require('../controllers/cartController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth, addBookToCart);
router.get('/', requireAuth, getCart);
router.put('/:bookId', requireAuth, updateBookQuantityInCart);
router.delete('/:bookId', requireAuth, removeBookFromCart);

module.exports = router;
