const express = require("express");
const router = express.Router();
const { getAllSongs, getSongById, addSong, updateSong, deleteSong } = require("../controllers/songs.controllers");
const  { authorize, CORS } = require("../utils/middleware");

router.get("/songs", CORS, getAllSongs);
router.get("/songs/:id", CORS, getSongById);

router.post("/songs/add", CORS, authorize, addSong);

router.put("/songs/update/:id", CORS, authorize, updateSong);

router.delete("/songs/delete/:id", CORS, authorize, deleteSong);

module.exports = router;