const express = require("express");
const verifyToken = require('../controllers/auth');
const { addCartUsername, getCart, putCart, genQrCode} = require('../controllers/cart');

const router = express.Router();

// obtener carrito del usuario
router.get("/cart", [verifyToken.checkIfAuthenticated], getCart);

// crear carrito
router.post("/cart", [verifyToken.checkIfAuthenticated], addCartUsername);

// generar qrcode
router.put("/cart/genqrcode/", [verifyToken.checkIfAuthenticated], genQrCode);

// obtener carrito del usuario
router.put("/cart", [verifyToken.checkIfAuthenticated] ,putCart);


module.exports = router;