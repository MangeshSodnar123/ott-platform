// models/TVShow.js
const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  episodeNumber: Number,
  seasonNumber: Number,
  releaseDate: Date,
  director: String,
  actors: [String],
});

const tvShowSchema = new mongoose.Schema({
  title: String,
  description: String,
  genres: [String],
  episodes: [episodeSchema],
});

module.exports = mongoose.model('TVShow', tvShowSchema, 'TVShow');
