const express = require("express");
const movieSchema = require("../models/movies");

const router = express.Router();

// crear usuario
router.post("/movies", (req, res) => {
    const movie = movieSchema(req.body);
    movie
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;