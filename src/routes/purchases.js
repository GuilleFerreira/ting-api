const express = require("express");
const verifyToken = require('../controllers/auth');
const { getPurchasesUsername, addPurchase } = require('../controllers/purchases');
const router = express.Router();

// obtener compras del usuario
router.get("/mypurchases", [verifyToken.checkIfAuthenticated], getPurchasesUsername);

// crear compra
router.post("/mypurchases", [verifyToken.checkIfAuthenticated], addPurchase);

module.exports = router;