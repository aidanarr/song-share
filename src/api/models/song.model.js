const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  year: {
    type: Number,
    required: false
  },
  album: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: true
  },
  url: {
      type: String,
      required: false
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;