const Song = require("../models/song.model");
const Artist = require("../models/artist.model");
const User = require("../models/user.model");

async function getAllSongs(req, res) {
    try {
        const allSongs = (await Song.find().populate("artist"));
        res.status(200).json({
            success: true,
            count: allSongs.length,
            data: allSongs
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error
        })
    }
};

async function getSongById(req, res) {
    try {
        const id = req.params.id;
        const songs = await Song.findById(id).populate("artist");
    
        if (songs.length === 0) {
            res.status(400).json({success: false, message: "Not found"});
        } else {
            res.status(200).json({success: true, data: songs[0]});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error});
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
                user: userCreator._id
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
                user: userCreator._id
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
    try {
        const id = req.params.id;
        const { title, artist, artist2, artist3, artist4, year, album, img, genre, url, user } = req.body;
         
        const artistArray = [artist, artist2, artist3, artist4];

        // Remove empty fields from array
        const artists = artistArray.filter(Boolean);
        
        // find if artists already exist
        const songArtist = await Artist.find({name: { $in: artists }});
        
        // find user
        const userCreator = await User.findOne({ username: user });
    
        let artistId = [];
    
        let updatedData = {
          title: title,
          artist: artistId,
          year: year,
          album: album,
          img: img,
          genre: genre,
          url: url,
        };
    
        // if some artists exist and some don't
        if (artists.length !== songArtist.length) {
          let artistsCopy = artists;

          songArtist.forEach((author) => {
            //add artist id to updated data
            artistId.push(author._id);
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

            artistId.push(newArtist._id);
            await newArtist.save();
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
          });

          // await Song.findOneAndUpdate( {
          //     _id: id,
          // },
          //     {
          //         $set: updatedData
          //     },
          //     {
          //         new: true,
          //         runValidators: true
          //     }).then(song => {
          //         res.status(200).json({success: true, updated_song: song})
          //     }).catch(err => {
          //         console.error(err)
          //     })

          res.status(200).json({ success: true, updated_data: updatedData });
        } else if (artists.length === songArtist.length) {
          // if all artists already exist
          songArtist.forEach((author) => {
            artistId.push(author._id);
          });

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
            .then((song) => {
              res
                .status(200)
                .json({ success: true, updated_data: updatedData });
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          // if no artist exist
          artists.forEach(async (author) => {
            const newArtist = await Artist.create({
              name: author,
              user: userCreator._id
            });
            artistId.push(newArtist._id)
            await newArtist.save();await Song.findOneAndUpdate(
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
          });
          

        }
    } catch (error){
        res.status(400).json({ success: false, message: error });
    }
}

module.exports = { getAllSongs, getSongById, addSong, updateSong }