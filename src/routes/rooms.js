const express = require("express");
const roomsSchema = require("../models/rooms");

const router = express.Router();

router.get("/rooms", (req, res) => {
    roomsSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// crear room
router.post("/rooms", (req, res) => {
    const room = roomsSchema(req.body);
    room
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener room por id
router.get("/rooms/:id", (req, res) => {
    const { id } = req.params;
    roomsSchema
        .find({ room_id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// actualizar room por id
router.put("/rooms/:id", (req, res) => {
    const { id } = req.params;
    const { postImg, description, tags } = req.body;
    roomsSchema
        .updateOne({ room_id: id }, { $set: { postImg: postImg, description: description, tags: tags }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// eliminar room por id
router.delete("/rooms/:id", (req, res) => {
    const { id } = req.params;
    roomsSchema
        .remove({ room_id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;