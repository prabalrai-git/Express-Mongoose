const express = require("express");

const { addNewUser, getUser } = require("../Controllers/User-controller");

const router = express.Router();

router.post("/login", getUser);

router.post("/", addNewUser);

module.exports = router;
