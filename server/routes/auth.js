const express = require("express");
const router = express.Router();
const { register, login, user } = require("../controller/auth");
const verify = require("../middleware/verify");

router.post("/register", register);
router.post("/login", login);

router.get("/user", verify, user);

module.exports = router;
