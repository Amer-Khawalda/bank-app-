const FavList = require('../models/favList');
const User = require('../models/User');
const Book = require('../models/books');

exports.addBooks = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { bookId } = req.body;
  const _id = bookId

  try {
    const book = await Book.findOne({ _id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const favItem = await FavList.create({
      bookId: _id,
      userId: user._id,
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      country: book.country,
      imageLink: book.imageLink,
      language: book.language,
      link: book.link,
      pages: book.pages
    });

    res.status(200).json({ message: 'Book added to favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};



exports.deleteBooks = async (req, res) => {
  try {
    const book = await FavList.findOneAndDelete({ userId: req.user._id });


    res.status(200).json({ message: 'Books delete' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


exports.getBooks = async (req, res) => {

  try {
    const book = await FavList.find({ userId: req.user._id });

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


