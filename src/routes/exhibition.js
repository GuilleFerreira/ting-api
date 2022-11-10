const express = require("express");
const { getExhibition, addExhibition } = require('../controllers/exhibition');

const router = express.Router();

// obtener todas las exhibition
router.get("/exhibition", getExhibition);

// crear exhibition
router.post("/exhibition", addExhibition);

module.exports = router;