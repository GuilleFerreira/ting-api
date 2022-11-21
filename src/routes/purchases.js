const express = require("express");
const verifyToken = require('../controllers/auth');
const { getPurchasesUsername, addPurchase } = require('../controllers/purchases');
const router = express.Router();

// obtener carrito del usuario
router.get("/mypurchases/", [verifyToken.checkIfAuthenticated], getPurchasesUsername);

// crear carrito
router.post("/mypurchases/", [verifyToken.checkIfAuthenticated], addPurchase);

module.exports = router;