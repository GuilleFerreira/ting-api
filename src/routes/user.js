const express = require("express");
const { getUsers, addUser, getUserUsername, removeUserUsername, putUserUsername } = require('../controllers/user');

const router = express.Router();

// get todos los usuarios
router.get("/users", getUsers);

// crear usuario
router.post("/users", addUser);

// obtener usuario por username
router.get("/users/:username", getUserUsername);

// actualizar usuario por username
router.put("/users/:username", putUserUsername);

// eliminar usuario por username
router.delete("/users/:username", removeUserUsername);

module.exports = router;