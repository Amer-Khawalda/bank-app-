const Book = require('../models/books');

exports.SendBooks = async (req, res) => {
  try {
    const booksData = req.body;

    const books = booksData.map(bookData => ({
      title: bookData.title,
      author: bookData.author,
      year: bookData.year,
      description: bookData.description,
      country: bookData.country,
      imageLink: bookData.imageLink,
      language: bookData.language,
      link: bookData.link,
      pages: bookData.pages
    }));

    await Book.insertMany(books);

    res.status(200).json({ message: 'Books data sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



exports.getBooks = async (req, res) => {
    try {
      const books = await Book.find();
  
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };