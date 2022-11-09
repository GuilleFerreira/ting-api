const express = require("express");
const { getExtras, addExtras, getExtraID, getExtraPriceID, putExtraID, removeExtraID } = require('../controllers/extras');

const router = express.Router();

// obtener todos los extras
router.get("/extras", getExtras);

// crear extra
router.post("/extras", addExtras);

// obtener extra por id
router.get("/extras/:id", getExtraID);

// obtener precio del extra por id
router.get("/extras/price/:id", getExtraPriceID);

// actualizar extra por id
router.put("/extras/:id", putExtraID);

// eliminar extra por id
router.delete("/extras/:id", removeExtraID);

module.exports = router;