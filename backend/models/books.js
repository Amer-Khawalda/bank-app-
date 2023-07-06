const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  language: {
    type: String,
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
