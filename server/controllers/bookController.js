// controllers/bookController.js
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book', error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get books', error: error.message });
  }
};

exports.addReviewToBook = async (req, res) => {
    const { bookId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id; // Assuming the user's ID is attached to the request by the auth middleware

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Add review
        book.reviews.push({
            comment,
            rating,
            user: userId,
        });

        await book.save();
        res.status(201).json({ message: 'Review added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    const { query } = req.query; // Search query could match either the title or the author
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search
                { author: { $regex: query, $options: 'i' } },
            ],
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully.', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};
