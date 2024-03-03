// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reviews: [{
    comment: String,
    rating: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
