const express = require("express");
const router = express.Router();
const { getAllSongs, getSongById, addSong, updateSong } = require("../controllers/songs.controllers");

router.get("/songs", getAllSongs);
router.get("/songs/:id", getSongById);

router.post("/songs/add", addSong);

router.put("/songs/update/:id", updateSong)

module.exports = router;