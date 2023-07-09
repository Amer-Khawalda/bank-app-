const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
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
},
);


const FavList = mongoose.model('FavList', FavSchema);

module.exports = FavList;
