// routes/bookRoutes.js
const express = require('express');
const { addBook, getAllBooks, getBook, updateBook, deleteBook, addReviewToBook, searchBooks } = require('../controllers/bookController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a new book
router.post('/', [
    requireAuth,
    body('title').not().isEmpty().trim().withMessage('Title is required'),
    body('author').not().isEmpty().trim().withMessage('Author is required'),
    body('ISBN').not().isEmpty().trim().withMessage('ISBN is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], addBook);

router.get('/', getAllBooks);

router.get('/:bookId', getBook);

// Route to update a book
router.put('/:bookId', [
    requireAuth,
    param('bookId').isMongoId().withMessage('Invalid book ID'),
    body('title').optional().trim().not().isEmpty().withMessage('Title cannot be empty'),
    body('author').optional().trim().not().isEmpty().withMessage('Author cannot be empty'),
    body('ISBN').optional().trim().not().isEmpty().withMessage('ISBN cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], updateBook);

router.delete('/:bookId', requireAuth, deleteBook);

// Route to add a review to a book
router.post('/:bookId/reviews', [
    requireAuth,
    param('bookId').isMongoId().withMessage('Invalid book ID'),
    body('comment').not().isEmpty().trim().withMessage('Comment cannot be empty'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], addReviewToBook);

router.get('/search', searchBooks);

module.exports = router;
