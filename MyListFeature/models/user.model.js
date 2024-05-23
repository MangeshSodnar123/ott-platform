const mongoose = require('mongoose');

const Genre = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'];

const watchHistorySchema = new mongoose.Schema({
  contentId: String,
  watchedOn: Date,
  rating: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  preferences: {
    favoriteGenres: [String],
    dislikedGenres: [String],
  },
  watchHistory: [watchHistorySchema],
  myList: [String],
});

module.exports = mongoose.model('User', userSchema,'User');
