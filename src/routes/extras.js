const express = require("express");
const verifyToken = require('../controllers/auth');
const { getExtras, addExtras, getExtraID, getExtraPriceID, putExtraID, removeExtraID } = require('../controllers/extras');

const router = express.Router();

// obtener todos los extras
router.get("/extras", [verifyToken.checkIfAuthenticated], getExtras);

// crear extra
router.post("/extras", [verifyToken.checkIfAuthenticated], addExtras);

// obtener extra por id
router.get("/extras/:id", [verifyToken.checkIfAuthenticated], getExtraID);

// obtener precio del extra por id
router.get("/extras/price/:id", [verifyToken.checkIfAuthenticated], getExtraPriceID);

// actualizar extra por id
router.put("/extras/:id", [verifyToken.checkIfAuthenticated], putExtraID);

// eliminar extra por id
router.delete("/extras/:id", [verifyToken.checkIfAuthenticated], removeExtraID);

module.exports = router;