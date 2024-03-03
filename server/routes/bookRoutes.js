// routes/bookRoutes.js
const express = require('express');
const { addBook, getAllBooks, getBook, updateBook, deleteBook, addReviewToBook, searchBooks } = require('../controllers/bookController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth, addBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBook);
router.put('/:bookId', requireAuth, updateBook);
router.delete('/:bookId', requireAuth, deleteBook);
router.post('/:bookId/reviews', requireAuth, addReviewToBook);
router.get('/search', searchBooks);

module.exports = router;
