const express = require("express");
const router = express.Router();
const { signup, login, deleteUser, userDetails } = require("../controllers/user.controllers");
const  { authorize, CORS } = require("../utils/middleware");

router.post("/signup", CORS, signup);
router.post("/login", CORS, login);

router.get("/user/:id", CORS, userDetails);

router.delete("/user/delete/:id", CORS, authorize, deleteUser);

module.exports = router;
