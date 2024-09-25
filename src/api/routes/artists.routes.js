const express = require("express");
const router = express.Router();
const  { authorize } = require("../utils/middleware");
const { getAllArtists, getArtistById, addArtist, updateArtist, deleteArtist } = require("../controllers/artists.controllers");

router.get("/artists", getAllArtists);
router.get("/artists/:id", getArtistById);

router.post("/artists/add", authorize, addArtist);

router.put("/artists/update/:id", authorize, updateArtist);

router.delete("/artists/delete/:id", authorize, deleteArtist);

module.exports = router;