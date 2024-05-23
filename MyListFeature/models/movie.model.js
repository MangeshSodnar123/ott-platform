// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genres: [String],
  releaseDate: Date,
  director: String,
  actors: [String],
});

module.exports = mongoose.model('Movie', movieSchema,'Movie');
