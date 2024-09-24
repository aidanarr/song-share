const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
  });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;