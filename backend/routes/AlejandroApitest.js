const express = require("express");
const router = express.Router();

const {alejandroApitest} = require("../controllers/AlejandroApitest");

router.get("/AlejandroApitest", alejandroApitest);

module.exports = router;