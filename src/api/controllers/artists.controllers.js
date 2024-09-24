const Song = require("../models/song.model");
const Artist = require("../models/artist.model");
const User = require("../models/user.model");

async function getAllArtists(req, res) {
    try {
        const allArtists = await Artist.find();
        
        res.status(200).json({
            success: true,
            count: allArtists.length,
            data: allArtists
        })
        
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error
        })
    }
}

async function getArtistById(req, res) {
    try {
        const id = req.params.id;
        const artist = await Artist.findById(id);

        const allSongs = await Song.find().populate("artist");

        const cleanSongs = allSongs.map((song) => {
            const songObject = {
                _id: song._id,
                title: song.title,
                artist: song.artist.map(artist => artist.name)
            }
            return songObject
        })

        const filteredSongs = cleanSongs.filter(song => song.artist.includes(artist.name))  
    
        if (artist.length === 0) {
            res.status(400).json({success: false, message: "Not found"});
        } else {
            res.status(200).json({success: true, artist_data: artist, artist_songs: filteredSongs});
        }

    } catch (error) {
        res.status(400).json({success: false, message: error});
    }  
}

async function addArtist(req, res) {

    try {
      const { name, bio, img, user } = req.body;

      const alreadyExists = await Artist.find({ name: name });

      if (alreadyExists.length === 0) {
        try {
          // find user
          const userCreator = await User.findOne({ username: user });

          // create artist using body
          const newArtist = await Artist.create({
            name: name,
            bio: bio,
            img: img,
            user: userCreator._id,
          });

          await newArtist.save();
        } catch (err) {
          console.error(err);
        }
      } else {
        res.status(400).json({
          success: false,
          message: "This artist already exists",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
}

module.exports = { getAllArtists, getArtistById, addArtist }

