const express = require("express");
const { getExhibition, getTheatersByMovie ,addExhibition, getTheaterByMovie, getSchedule, buildRoom } = require('../controllers/exhibition');

const router = express.Router();

// obtener todas las exhibition
router.get("/exhibitions", getExhibition);

//router.get("/exhibition/theater/:movie", getTheatersByMovie);

// crear exhibition
router.post("/exhibition", addExhibition);

// obtener exhibition por nombre de la pelicula
router.get("/exhibitions/gettheaters/:movie", getTheaterByMovie);

// obtener exhibitions por movie, theater y date
router.get("/exhibitions/getschedule/:movie/:theater/:date", getSchedule);

router.get("/exhibitions/room/:id", buildRoom);

module.exports = router;