const express = require("express");
const verifyToken = require('../controllers/auth');
const { addCartUsername, getCart, putCart, genQrCode} = require('../controllers/cart');

const router = express.Router();

// obtener carrito del usuario
router.get("/cart/:username", getCart);

// crear carrito
router.post("/cart", addCartUsername);

// generar qrcode
router.put("/cart/genqrcode/", [verifyToken.checkIfAuthenticated], genQrCode);

// obtener carrito del usuario
router.put("/cart/:username", putCart);


module.exports = router;