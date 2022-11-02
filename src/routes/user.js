const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// get todos los usuarios
router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// crear usuario
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener usuario por username
router.get("/users/:username", (req, res) => {
    const { username } = req.params;
    userSchema
        .find({ username: username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// actualizar usuario por username
router.put("/users/:username", (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    userSchema
        .updateOne({ username: username }, { $set: { password: password }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// eliminar usuario por username
router.delete("/users/:username", (req, res) => {
    const { username } = req.params;
    userSchema
        .remove({ username: username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});


module.exports = router;