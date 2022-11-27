const express = require("express");
const verifyToken = require('../controllers/auth');
const { getExhibition, addExhibition, getTheaterByMovie, getSchedule, buildRoom, putSeats } = require('../controllers/exhibition');

const router = express.Router();

// obtener todas las exhibition
router.get("/exhibitions", [verifyToken.checkIfAuthenticated], getExhibition);

// crear exhibition
router.post("/exhibitions", addExhibition);

// editar exhibition asientos
router.put("/exhibitions/seats/:id", [verifyToken.checkIfAuthenticated], putSeats);

// obtener exhibition por nombre de la pelicula
router.get("/exhibitions/theaters/:movie", [verifyToken.checkIfAuthenticated], getTheaterByMovie);

// obtener exhibitions por movie, theater y date
router.get("/exhibitions/schedule/:movie/:theater/:date", [verifyToken.checkIfAuthenticated], getSchedule);

router.get("/exhibitions/room/:id", [verifyToken.checkIfAuthenticated], buildRoom);

module.exports = router;