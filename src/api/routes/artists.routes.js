const express = require("express");
const router = express.Router();

const { getAllArtists, getArtistById, addArtist, updateArtist, deleteArtist } = require("../controllers/artists.controllers");

router.get("/artists", getAllArtists);
router.get("/artists/:id", getArtistById);

router.post("/artists/add", addArtist);

router.put("/artists/update/:id", updateArtist);

router.delete("/artists/delete/:id", deleteArtist);

module.exports = router;