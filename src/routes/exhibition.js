const express = require("express");
const { getExhibition, getTheatersByMovie, addExhibition } = require('../controllers/exhibition');

const router = express.Router();

// obtener todas las exhibition
router.get("/exhibition", getExhibition);

router.get("/exhibition/theater/:movie", getTheatersByMovie);

// crear exhibition
router.post("/exhibition", addExhibition);

module.exports = router;