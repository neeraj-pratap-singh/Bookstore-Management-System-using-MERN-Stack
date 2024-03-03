// routes/cartRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { addBookToCart, getCart, updateBookQuantityInCart, removeBookFromCart } = require('../controllers/cartController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', [
    requireAuth,
    body('bookId').not().isEmpty().withMessage('Book ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], addBookToCart);
router.get('/', requireAuth, getCart);
router.put('/:bookId', [
    requireAuth,
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], updateBookQuantityInCart);
router.delete('/:bookId', requireAuth, removeBookFromCart);

module.exports = router;
