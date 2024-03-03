const { validationResult } = require('express-validator');
const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, ISBN, price, quantity } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            ISBN,
            price,
            quantity
        });

        const book = await newBook.save();
        res.status(201).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get a single book by ID
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, ISBN, price, quantity } = req.body;
    const bookFields = { title, author, ISBN, price, quantity };

    try {
        let book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        book = await Book.findByIdAndUpdate(
            req.params.bookId,
            { $set: bookFields },
            { new: true }
        );

        res.json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        await book.remove();
        res.json({ msg: 'Book removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Add a review to a book
exports.addReviewToBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { comment, rating } = req.body;

    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        const newReview = {
            comment,
            rating,
            user: req.user.id // Assuming the user's ID is attached to the request
        };

        book.reviews.push(newReview);
        await book.save();
        res.json(book.reviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Search for books by title or author
exports.searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
