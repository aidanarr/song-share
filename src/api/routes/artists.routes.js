const express = require("express");
const router = express.Router();

const { getAllArtists, getArtistById, addArtist } = require("../controllers/artists.controllers")

router.get("/artists", getAllArtists);
router.get("/artists/:id", getArtistById)

router.post("/artists/add", addArtist)

module.exports = router;