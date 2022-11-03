const express = require("express");
const movieSchema = require("../models/movies");

const router = express.Router();

// obtener todas las peliculas
router.get("/movies", (req, res) => {
    movieSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// crear pelicula
router.post("/movies", (req, res) => {
    const movie = movieSchema(req.body);
    movie
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener pelicula por id
router.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    movieSchema
        .find({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener pelicula por nombre
router.get("/movies/:name", (req, res) => {
    const { name } = req.params;
    movieSchema
        .find({ name: name })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// actualizar pelicula por nombre
router.put("/movies/:name", (req, res) => {
    const { name } = req.params;
    const { postImg, description, tags } = req.body;
    movieSchema
        .updateOne({ name: name }, { $set: { postImg: postImg, description: description, tags: tags }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// eliminar usuario por username
router.delete("/movies/:name", (req, res) => {
    const {  name } = req.params;
    movieSchema
        .remove({ name: name })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener imagen wide de pelicula por nombre
router.get("/movies/imgwide/:name", (req, res) => {
    const { name } = req.params;
    movieSchema
        .find({ name: name }).select({"_id": 0,"postImg.urlWide": 1})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener imagen de pelicula por nombre
router.get("/movies/img/:name", (req, res) => {
    const { name } = req.params;
    movieSchema
        .find({ name: name }).select({"_id": 0,"postImg.url": 1})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;