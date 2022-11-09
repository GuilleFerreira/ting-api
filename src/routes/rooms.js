const express = require("express");
const { getRooms, addRoom, getRoomID, putRoomID, removeRoomID } = require('../controllers/rooms');

const router = express.Router();

router.get("/rooms", getRooms);

// crear room
router.post("/rooms", addRoom);

// obtener room por id
router.get("/rooms/:id", getRoomID);

// actualizar room por id
router.put("/rooms/:id", putRoomID);

// eliminar room por id
router.delete("/rooms/:id", removeRoomID);

module.exports = router;