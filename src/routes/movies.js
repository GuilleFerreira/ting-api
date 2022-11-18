const express = require("express");
const verifyToken = require('../controllers/auth');
const { getMovies, addMovie, getMovieID, getMovieName, putMovieName, removeMovieName, getMovieImgWide, getMovieImg, getMoviesList } = require('../controllers/movies');

const router = express.Router();

// obtener todas las peliculas
router.get("/movies", getMovies);

// obtener todas las peliculas
router.get("/movieslist", [verifyToken.checkIfAuthenticated], getMoviesList);

// crear pelicula
router.post("/movies", addMovie);

// obtener pelicula por id
//router.get("/movie/:id", [verifyToken.checkIfAuthenticated], getMovieID);

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