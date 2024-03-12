const express = require("express");
const router = express.Router();
const { addPlace, deletePlace } = require("../controller/user");
const verify = require("../middleware/verify");

router.post("/addplace", verify, addPlace);
router.delete("/deleteplace", verify, deletePlace);

module.exports = router;
