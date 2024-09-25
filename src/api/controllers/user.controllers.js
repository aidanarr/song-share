const Song = require("../models/song.model");
const Artist = require("../models/artist.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signup(req, res){
    try{
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
    } catch (error){
        res.status(400).json({
            sucess: false,
            error: error
        })
    }
}

async function login(req, res){
    try {
            const { user, pass } = req.body;

            const userResult = await User.find({ username: user });

            if (userResult.length !== 0) {
              // check if password matches
              const samePassword = await bcrypt.compare(
                pass,
                userResult[0].password
              );

              if (samePassword) {
                // password matches
                const tokenInfo = {
                  user: userResult[0].username,
                  id: userResult[0]._id,
                };
                const token = jwt.sign(tokenInfo, process.env.SECRET, {
                  expiresIn: "1h",
                });
                res.status(201).json({ success: true, token: token });
              } else {
                // password doesn't match
                res
                  .status(400)
                  .json({ success: false, message: "Wrong password" });
              }
            } else {
              res
                .status(400)
                .json({ success: false, message: "User doesn't exist" });
            }
    } catch(error) {
        res
        .status(400)
        .json({ success: false, message: error });
    }
}

async function deleteUser(req, res){
  const id = req.params.id
  const user = req.body.user;

  const userCreator = await User.findOne({ username: user });

  if (userCreator._id.equals(id)){
    try {
      await User.findOneAndDelete({
        _id: id,
      }).then(() => {
        res.status(200).json({
          success: true,
          message: "successfully deleted user " + user,
        });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "You cannot delete this user" });
  }
}

async function userDetails(req, res){
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("my_songs");
    const userData= {
      username: user.username,
      my_songs: user.my_songs
    };

    if (user.length === 0) {
      res.status(400).json({ success: false, message: "Not found" });
    } else {
      res.status(200).json({ success: true, data: userData });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
}

module.exports = { signup, login, deleteUser, userDetails }