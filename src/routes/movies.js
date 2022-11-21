const express = require("express");
const verifyToken = require('../controllers/auth');
const { getMovies, getMovieImgWide, getMovieImg, getMoviesList } = require('../controllers/movies');

const router = express.Router();

// obtener todas las peliculas
router.get("/movies", getMovies);

// obtener todas las peliculas
router.get("/movieslist", [verifyToken.checkIfAuthenticated], getMoviesList);

// obtener imagen wide de pelicula por nombre
router.get("/movies/imgwide/:name", [verifyToken.checkIfAuthenticated], getMovieImgWide);

// obtener imagen de pelicula por nombre
router.get("/movies/img/:name", [verifyToken.checkIfAuthenticated], getMovieImg);

module.exports = router;