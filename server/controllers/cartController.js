// controllers/cartController.js
const Cart = require('../models/Cart');
const Book = require('../models/Book');

exports.addBookToCart = async (req, res) => {
    const { bookId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!cart) {
            // Create a new cart if not exist
            cart = new Cart({
                user: userId,
                items: [{ book: bookId, quantity }],
            });
        } else {
            // Add to existing cart
            const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

            if (itemIndex > -1) {
                // Update quantity if book already in cart
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new book to cart
                cart.items.push({ book: bookId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: 'Book added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book to cart', error: error.message });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.book');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get cart', error: error.message });
    }
};

exports.updateBookQuantityInCart = async (req, res) => {
    const { bookId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json({ message: 'Cart updated successfully', cart });
        } else {
            res.status(404).json({ message: 'Book not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update cart', error: error.message });
    }
};

exports.removeBookFromCart = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.json({ message: 'Book removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Book not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove book from cart', error: error.message });
    }
};
