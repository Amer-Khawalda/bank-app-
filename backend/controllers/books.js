const Book = require('../models/books');



exports.getBooks = async (req, res) => {
    try {
      const books = await Book.find();
  
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };