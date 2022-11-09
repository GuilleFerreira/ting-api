const express = require("express");
const { getMovies, addMovie, getMovieID, getMovieName, putMovieName, removeMovieName, getMovieImgWide, getMovieImg } = require('../controllers/movies');

const router = express.Router();

// obtener todas las peliculas
router.get("/movies", getMovies);

// crear pelicula
router.post("/movies", addMovie);

// obtener pelicula por id
router.get("/movies/:id", getMovieID);

// obtener pelicula por nombre
router.get("/movies/:name", getMovieName);

// actualizar pelicula por nombre
router.put("/movies/:name", putMovieName);

// eliminar pelicula por nombre
router.delete("/movies/:name", removeMovieName);

// obtener imagen wide de pelicula por nombre
router.get("/movies/imgwide/:name", getMovieImgWide);

// obtener imagen de pelicula por nombre
router.get("/movies/img/:name", getMovieImg);

module.exports = router;