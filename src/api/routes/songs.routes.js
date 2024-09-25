const express = require("express");
const router = express.Router();
const { getAllSongs, getSongById, addSong, updateSong, deleteSong } = require("../controllers/songs.controllers");

router.get("/songs", getAllSongs);
router.get("/songs/:id", getSongById);

router.post("/songs/add", addSong);

router.put("/songs/update/:id", updateSong);

router.delete("/songs/delete/:id", deleteSong);

module.exports = router;