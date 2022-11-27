const express = require("express");
const verifyToken = require('../controllers/auth');
const { getPurchasesUsername, addPurchase, getPurchasesQR } = require('../controllers/purchases');
const router = express.Router();

// obtener compras del usuario
router.get("/mypurchases", [verifyToken.checkIfAuthenticated], getPurchasesUsername);

// obtener compras por qr
router.get("/mypurchases/:qr", [verifyToken.checkIfAuthenticated], getPurchasesQR);

// crear compra
router.post("/mypurchases", [verifyToken.checkIfAuthenticated], addPurchase);

module.exports = router;