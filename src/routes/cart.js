const express = require("express");
const { addCartUsername, getCartUsername,putCartUsername } = require('../controllers/cart');

const router = express.Router();

// obtener carrito del usuario
router.get("/cart/:username", getCartUsername);

// crear carrito
router.post("/cart", addCartUsername);

// obtener carrito del usuario
router.put("/cart/pepito", putCartUsername);

module.exports = router;