const Song = require("../models/song.model");
const Artist = require("../models/artist.model");
const User = require("../models/user.model");

async function getAllSongs(req, res) {
  try {
    const allSongs = await Song.find().populate("artist");
    res.status(200).json({
      success: true,
      count: allSongs.length,
      data: allSongs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
}

async function getSongById(req, res) {
  try {
    const id = req.params.id;
    const songs = await Song.findById(id).populate("artist").populate("user", "username");

    if (songs.length === 0) {
      res.status(400).json({ success: false, message: "Not found" });
    } else {
      res.status(200).json({ success: true, data: songs,});
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
}

async function addSong(req, res) {
  try {
    const {
      title,
      artist,
      artist2,
      artist3,
      artist4,
      year,
      album,
      img,
      genre,
      url,
      user,
    } = req.body;

    const artistArray = [artist, artist2, artist3, artist4];
    // Remove empty fields from array
    const artists = artistArray.filter(Boolean);

    // verify song doesn't already exist
    const alreadyExists = await Song.find({
      title: title,
      year: year,
      album: album,
    });

    if (alreadyExists.length === 0) {
      try {
        // find user
        const userCreator = await User.findOne({ username: user });

        // create song using body
        const newSong = await Song.create({
          title: title,
          year: year,
          album: album,
          img: img,
          genre: genre,
          url: url,
          user: userCreator._id,
        });

        // add song to user list
        userCreator.my_songs.push(newSong._id);

        // find if artists already exist
        const songArtist = await Artist.find({ name: { $in: artists } });

        // if some artists exist and some don't
        if (artists.length !== songArtist.length) {
          let artistsCopy = artists;

          // add existing artist's id to song and viceversa
          songArtist.forEach((author) => {
            newSong.artist.push(author._id);
            // remove artist from artists array
            const i = artistsCopy.indexOf(author.name);
            i !== -1 ? artistsCopy.splice(i, 1) : false;
          });

          // create new artists
          artistsCopy.forEach(async (author) => {
            const newArtist = await Artist.create({
              name: author,
              user: userCreator._id,
            });
            newSong.artist.push(newArtist._id);
            await newArtist.save();
          });
        } else if (artists.length === songArtist.length) {
          // if all artists already exist
          songArtist.forEach((author) => {
            newSong.artist.push(author._id);
          });
        } else {
          // if no artist exist
          artists.forEach(async (author) => {
            const newArtist = await Artist.create({
              name: author,
              user: userCreator._id,
            });
            newSong.artist.push(newArtist._id);
            await newArtist.save();
          });
        }

        await userCreator.save();
        await newSong.save();

        res.status(200).json({
          success: true,
          song: newSong,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(400).json({
        success: false,
        message: "This song already exists",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
}

async function updateSong(req, res) {
  const id = req.params.id;
  const song = await Song.findOne({ _id: id });
  const {
    title,
    artist,
    artist2,
    artist3,
    artist4,
    year,
    album,
    img,
    genre,
    url,
    user,
  } = req.body;
  // find user
  const userCreator = await User.findOne({ username: user });
  if (userCreator._id.equals(song.user)) {
    try {
      const artistArray = [artist, artist2, artist3, artist4];

      // Remove empty fields from array
      const artists = artistArray.filter(Boolean);

      // find if artists already exist
      const songArtist = await Artist.find({ name: { $in: artists } });

      let updatedData = {
        title: title,
        year: year,
        album: album,
        img: img,
        genre: genre,
        url: url,
      };
      
      if (songArtist.length === 0) {
        // if no artist exist
       
        if (artists.length === 0) {
          await Song.findOneAndUpdate(
            {
              _id: id,
            },
            {
              $set: updatedData,
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } else {
          const artistArray = artists.map((artist) => {
            return {
              name: artist,
              user: userCreator._id
            }
          })
          const newArtists = await Artist.insertMany(artistArray)
          const artistId = newArtists.map((artist) => artist._id)
          updatedData.artist = artistId
          await Song.findOneAndUpdate(
            {
              _id: id,
            },
            {
              $set: updatedData,
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }

        res.status(200).json({ success: true, updated_data: updatedData })

      } else if (artists.length !== songArtist.length) {
        // if some artists exist and some don't

        //create new artists

        const artistNames = songArtist.map((artist) => artist.name);
        const newArtistsNames = artists.filter((artist) => !artistNames.includes(artist));
        const artistArray = newArtistsNames.map((artist) => {
          return {
            name: artist,
            user: userCreator._id
          }
        });
        const newArtists = await Artist.insertMany(artistArray);
        const artistId = newArtists.map((artist) => artist._id);
        updatedData.artist = artistId;

        //add existing artists to updatedData
        const existingArtistsId = songArtist.map((artist) => artist._id);
        const allArtistIds = updatedData.artist.concat(existingArtistsId);

        updatedData.artist = allArtistIds;
    
        await Song.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: updatedData,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(200).json({ success: true, updated_data: updatedData })

      } else if (artists.length === songArtist.length) {
        // if all artists already exist
        const existingArtistsId = songArtist.map((artist) => artist._id);
        updatedData.artist = existingArtistsId;
        await Song.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: updatedData,
          },
          {
            new: true,
            runValidators: true,
          }
        )
        res.status(200).json({ success: true, updated_data: updatedData })
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "You cannot modify this song" });
  }
}

async function deleteSong(req, res) {

  const id = req.params.id;
  const { user } = req.body;
  

  const userCreator = await User.findOne({ username: user });
  const song = await Song.find({
    _id: id,
  });

  if (userCreator._id.equals(song[0].user)) {
    try {
      await User.findOneAndUpdate(
        {
          name: user,
        },
        {
          $pull: { my_songs: id }
        }
      );
      await Song.findOneAndDelete({
        _id: id,
      })
        .then(() => {
          res.status(200).json({
            success: true,
            message: "successfully deleted, song id: " + id,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "You cannot delete this song" });
  }
}

module.exports = { getAllSongs, getSongById, addSong, updateSong, deleteSong };
