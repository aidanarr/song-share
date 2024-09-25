const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');


const routerSongs = require("./api/routes/songs.routes");
const routerArtists = require("./api/routes/artists.routes");
const routerUser = require("./api/routes/user.routes")

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routerSongs);
app.use("/", routerArtists);
app.use("/", routerUser);

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



