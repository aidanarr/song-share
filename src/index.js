const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// server config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
});

// connect to MongoDB
mongoose.connect("mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASS + "@cluster0.yppen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", 
    { // db name
      dbName: 'music',
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  });


// auth middleware
const authorize = (req, res, next) => {
    const tokenString = req.headers.authorization;

    if(!tokenString) {
        res.status(400).json({successs: false, message: "You must login first"})
    } else {
        try {
            const token = tokenString;
            const verifiedToken = jwt.verify(token, process.env.SECRET);
             req.userInfo = verifiedToken;
        } catch (error) {
            res.status(400).json({success: false, message: error})
        }
    }
    
    next();
};

// GET songs
app.get("/songs", async (req, res) => {
    try {
        const allSongs = await Song.find().populate("artist", "user");
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
});

// GET songs (filter by id)
app.get("/songs/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const songs = await Song.findById(id).populate("artist", "user");
    
        if (results.length === 0) {
            res.status(400).json({success: false, message: "Not found"});
        } else {
            res.status(200).json({success: true, data: songs[0]});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }  
});

// GET artists
app.get("/artists", async (req, res) => {
    try {
        const allArtists = await Artist.find().populate("songs", "user");
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
});

// GET artists (filter by id)
app.get("/artists/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const artists = await Artist.findById(id).populate("artist", "user");
    
        if (results.length === 0) {
            res.status(400).json({success: false, message: "Not found"});
        } else {
            res.status(200).json({success: true, data: artists[0]});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }  
});


// SIGN UP - LOGIN

// POST (singup)
app.post("/signup", async (req, res) => {
    
    const {user, pass} = req.body;

    const userResult = await User.find({username: user});
    
    if (userResult.length === 0) {
        // user doesn't exist
        const hasshedPassword = await bcrypt.hash(pass, 10);
        const newUser = await User.create({
            username: user,
            password: hasshedPassword
        })
        await newUser.save()
        res.status(201).json({success: true, message: "Signup successful, welcome!"});
    } else {
        // user already exists
        res.status(200).json({success: false, message: "User already exists"});
    }

});

// POST (login)
app.post("/login", async (req, res) => {

    const {user, pass} = req.body;

    const userResult = await User.find({username: user});

    if (userResult.length !== 0) {
        // check if password matches
        const samePassword = await bcrypt.compare(pass, userResult[0].password);

        if (samePassword) {
            // password matches
            const tokenInfo = {user: userResult[0].username, id: userResult[0]._id};
            const token = jwt.sign(tokenInfo, process.env.SECRET, {expiresIn: "1h"});
            res.status(201).json({success: true, token: token});
        } else {
            // password doesn't match
            res.status(400).json({success: false, message: "Wrong password"});
        }
    } else {
        res.status(400).json({success: false, message: "User doesn't exist"});
    }

})

// USER MUSIC

// GET user songs
app.get("/mySongs", authorize, async (req, res) => {
    try {
        const allSongs = await Song.find().populate("artist", "user");
        res.status(200).json({
            success: true,
            count: allSongs.length,
            data: allSongs
        })
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }
});

// POST user songs
app.post("/mySongs/add", async (req, res) => {
    
    const { title, artist, artist2, artist3, artist4, year, album, img, genre, comments, url, user } = req.body;

    const artistArray = [artist, artist2, artist3, artist4];
    // Remove empty fields from array
    const artists = artistArray.filter(Boolean);

    // verify song doesn't already exist
    const alreadyExists = await Song.find({
        title: title,
        year: year,
        album: album        
    })

    if (alreadyExists.length === 0) {
        try {
            // find user
            const userCreator = await User.findOne({username: user});

            // create song using body
            const newSong = await Song.create({
                title: title,
                year: year,
                album: album,
                img: img,
                genre: genre,
                comments: comments,
                url: url,
                user: userCreator._id
            });

            // add song to user list
            userCreator.my_songs.push(newSong._id);

            // find if artists already exist
            const songArtist = await Artist.find({name: { $in: artists }});

            // if some artists exist and some don't
            if (artists.length !== songArtist.length) {
                let artistsCopy = artists;
                // add existing artist's id to song and viceversa
                songArtist.forEach(async (author) => {
                    newSong.artist.push(author._id);
                    author.songs.push(newSong._id);
                    // remove artist from artists array
                    const i = artistsCopy.indexOf(author.name);
                    i !== -1 ? artistsCopy.splice(i, 1) : false;
                    await author.save()
                });
                
                // create new artists
                artistsCopy.forEach(async (author) => {
                    const newArtist = await Artist.create({
                        name: author,
                    })
                    newArtist.songs.push(newSong._id)
                    newSong.artist.push(newArtist._id)
                    await newArtist.save()
                })        
                
            } else if (artists.length === songArtist.length) {
                // if all artists already exist
                songArtist.forEach(async (author) => {
                    newSong.artist.push(author._id);
                    author.songs.push(newSong._id);
                    await author.save()
                });
            } else {
                // if no artist exist
                artists.forEach(async (author) => {
                    const newArtist = await Artist.create({
                        name: author,
                    })
                    newArtist.songs.push(newSong._id)
                    newSong.artist.push(newArtist._id)
                    await newArtist.save()
                })
            }

            await userCreator.save()
            await newSong.save()

            res.status(200).json({
                success: true,
                song: newSong
            });
        } catch (err) {
            console.error(err)
        }
        
    } else {
        res.status(400).json({
            success: false,
            message: "This song already exists"
        });
    }

});

// POST user artists

app.post("/myArtists/add", async (req, res) => {

  const { name, bio, user } = req.body;

  const alreadyExists = await Artist.find({ name: name });

  if (alreadyExists.length === 0) {
    try {
      // find user
      const userCreator = await User.findOne({ username: user });

      // create artist using body
      const newArtist = await Artist.create({
        name: name,
        bio: bio,
        user: userCreator._id,
      });

      // add artist to user list
      userCreator.my_artists.push(newArtist._id);

      await userCreator.save();
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
});

// PUT modify song
app.put("/update-song/:_id", async (req, res) => {
    
    const id = req.params;
    const { title, artist, artist2, artist3, artist4, year, album, img, genre, comments, url } = req.body; 
    const artistArray = [artist, artist2, artist3, artist4];
    // Remove empty fields from array
    const artists = artistArray.filter(Boolean);

    // find if artists already exist
    const songArtist = await Artist.find({name: { $in: artists }});

    let artistId = [];

    let updatedData = {
      title: title,
      artist: artistId,
      year: year,
      album: album,
      img: img,
      genre: genre,
      comments: comments,
      url: url,
    };

    // if some artists exist and some don't
    if (artists.length !== songArtist.length) {
        let artistsCopy = artists;
               
        songArtist.forEach(async (author) => {
            //add artist id to updated data
            artistId.push(author._id);

            //add song to artist if it doesn't exist
            const songIndex = author.songs.includes(id);
            console.log(songIndex);
            !songIndex ? author.songs.push(id) : false;

            // const artistSongs = await Song.findOne({
            //     name: author,
            //     songs: { $in: id }},
            // );
            // !artistSongs ? author.songs.push(id) : false;

            // remove artist from artists array
            const i = artistsCopy.indexOf(author.name);
            i !== -1 ? artistsCopy.splice(i, 1) : false;
            
            await author.save()
        });

        // create new artists
        artistsCopy.forEach(async (author) => {
            const newArtist = await Artist.create({
                name: author,
            })
            newArtist.songs.push(id)
            artistId.push(newArtist._id);

            await newArtist.save()
        });
        
        await Song.findOneAndUpdate( id, 
            {
                $set: updatedData
            },
            {
                new: true,
                runValidators: true
            }).then(song => {
                res.status(200).json({success: true, updated_song: song})
                console.log(artistId)
            }).catch(err => {
                console.error(err)
            })
        
    // } else if (artists.length === songArtist.length) {
    //     // if all artists already exist
    //     songArtist.forEach(async (author) => {
    //         newSong.artist.push(author._id);
    //         author.songs.push(newSong._id);
    //         await author.save()
    //     });
    } else {
        // // if no artist exist
        // artists.forEach(async (author) => {
        //     const newArtist = await Artist.create({
        //         name: author,
        //     })
        //     newArtist.songs.push(newSong._id)
        //     newSong.artist.push(newArtist._id)
        //     await newArtist.save()
        // })
    }



    // await Song.findOneAndUpdate( id, 
    //     {
    //         $set: req.body
    //     },
    //     {
    //         new: true,
    //         runValidators: true
    //     }).then(song => {
    //         res.status(200).json({success: true, updated_song: song})
    //     }).catch(err => {
    //         console.error(err)
    //     })
        
});

// delete en la tabla del usuario
app.delete("/myPets/:id", async (req, res) => {
    const conn = await getConnection();
    const idPet = req.params.id;
    const deletePet = "DELETE from userpets WHERE id = ?;";
    const [results] = await conn.query(deletePet, [idPet]);



    if (results.affectedRows > 0) {
        res.status(200).json({success: true, message: "Registro borrado" });
    } else {
        res.status(200).json({success: false, message: "No existe una mascota con ese id"})
    }
})

// rutas estáticas
const staticUrl = "./src/public";
app.use(express.static(staticUrl));