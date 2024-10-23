const express = require("express");
const router = express.Router();
const { signup, login, deleteUser, userDetails } = require("../controllers/user.controllers");
const  { authorize } = require("../utils/middleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/user/:id", userDetails);

router.delete("/user/delete/:id", authorize, deleteUser);

module.exports = router;
