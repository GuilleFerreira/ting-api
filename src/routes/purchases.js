const express = require("express");
const { getPurchasesUsername, addPurchase } = require('../controllers/purchases');

const router = express.Router();

// obtener carrito del usuario
router.get("/purchases/:username", getPurchasesUsername);

// crear carrito
router.post("/purchase", addPurchase);

module.exports = router;