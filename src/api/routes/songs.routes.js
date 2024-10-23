const express = require("express");
const router = express.Router();
const { getAllSongs, getSongById, addSong, updateSong, deleteSong } = require("../controllers/songs.controllers");
const  { authorize } = require("../utils/middleware");

router.get("/songs", getAllSongs);
router.get("/songs/:id", getSongById);

router.post("/songs/add", authorize, addSong);

router.put("/songs/update/:id", authorize, updateSong);

router.delete("/songs/delete/:id", authorize, deleteSong);

module.exports = router;