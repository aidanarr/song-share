const express = require("express");
const router = express.Router();
const  { authorize, CORS } = require("../utils/middleware");
const { getAllArtists, getArtistById, addArtist, updateArtist, deleteArtist } = require("../controllers/artists.controllers");

router.get("/artists", CORS, getAllArtists);
router.get("/artists/:id", CORS, getArtistById);

router.post("/artists/add", CORS, authorize, addArtist);

router.put("/artists/update/:id", CORS, authorize, updateArtist);

router.delete("/artists/delete/:id", CORS, authorize, deleteArtist);

module.exports = router;