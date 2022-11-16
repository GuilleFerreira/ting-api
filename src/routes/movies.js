const express = require("express");
const verifyToken = require('../controllers/auth');
const { getMovies, getAllMoviesNames, addMovie, getMovieID, getMovieName, putMovieName, removeMovieName, getMovieImgWide, getMovieImg } = require('../controllers/movies');

const router = express.Router();

// obtener todas las peliculas
router.get("/movies", getMovies);

router.get("/movies/names", [verifyToken.checkIfAuthenticated], getAllMoviesNames);

// crear pelicula
router.post("/movies", addMovie);

// obtener pelicula por id
router.get("/movie/:id", [verifyToken.checkIfAuthenticated], getMovieID);

// obtener pelicula por nombre
router.get("/movie/:name", [verifyToken.checkIfAuthenticated], getMovieName);


// actualizar pelicula por nombre
router.put("/movie/:name", putMovieName);

// eliminar pelicula por nombre
router.delete("/movie/:name", removeMovieName);

// obtener imagen wide de pelicula por nombre
router.get("/movies/imgwide/:name", getMovieImgWide);

// obtener imagen de pelicula por nombre
router.get("/movies/img/:name", getMovieImg);

module.exports = router;