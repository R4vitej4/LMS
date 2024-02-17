// bookModel.js
const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true
    },
    BookAuthor: {
        type: String,
        required: true
    },
    BookPages: {
        type: Number,
        required: true
    },
    BookPrice: {
        type: Number,
        required: true
    },
    BookState: {
        type: String,
        enum: ['Available', 'Issued'],
        default: 'Available'
    }
});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
