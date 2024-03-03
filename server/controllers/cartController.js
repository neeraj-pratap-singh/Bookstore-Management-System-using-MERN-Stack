const { validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Add Book to Cart
exports.addBookToCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id; // Assuming you have user ID from JWT token
    const { bookId, quantity } = req.body;

    try {
        // Ensure the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the cart exists for the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ user: userId, items: [{ book: bookId, quantity }] });
        } else {
            // If the cart exists, check if the book is already in the cart
            const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

            if (itemIndex > -1) {
                // Update quantity if the book is already in the cart
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add a new book to the cart
                cart.items.push({ book: bookId, quantity });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to add book to cart' });
    }
};

// Get Cart
exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.book');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to retrieve cart' });
    }
};

// Update Book Quantity in Cart
exports.updateBookQuantityInCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { bookId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Book not found in cart' });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to update book quantity in cart' });
    }
};

// Remove Book from Cart
exports.removeBookFromCart = async (req, res) => {
    const userId = req.user.id;
    const { bookId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        await cart.save();
        res.json({ message: 'Book removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to remove book from cart' });
    }
};
