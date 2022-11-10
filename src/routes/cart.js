const express = require("express");
const { addCartUsername, getCartUsername } = require('../controllers/cart');

const router = express.Router();

// obtener carrito del usuario
router.get("/cart/:username", getCartUsername);

// crear carrito
router.post("/cart", addCartUsername);

module.exports = router;