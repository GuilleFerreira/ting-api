const express = require("express");
const funcionesSchema = require("../models/funciones");

const router = express.Router();

// obtener todas las funciones
router.get("/funciones", (req, res) => {
    funcionesSchema
        .aggregate([
        {$lookup: {from: "movies", localField: "movie", foreignField: "_id", as: "pelicula"}},
        {$lookup: {from: "rooms", localField: "room", foreignField: "_id", as: "room"}},
        {$project: {theater:1, pelicula: {name:1, description:1}, room: {room_id:1}}}
        ])
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// crear funcion
router.post("/funciones", (req, res) => {
    const funcion = funcionesSchema(req.body);
    funcion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;