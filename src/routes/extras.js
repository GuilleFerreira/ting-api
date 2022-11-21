const express = require("express");
const verifyToken = require('../controllers/auth');
const { getExtras, addExtras } = require('../controllers/extras');

const router = express.Router();

// obtener todos los extras
router.get("/extras", [verifyToken.checkIfAuthenticated], getExtras);

// crear extra
router.post("/extras", [verifyToken.checkIfAuthenticated], addExtras);

module.exports = router;