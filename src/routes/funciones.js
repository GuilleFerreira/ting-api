const express = require("express");
const { getFunciones, addFuncion } = require('../controllers/funciones');

const router = express.Router();

// obtener todas las funciones
router.get("/funciones", getFunciones);

// crear funcion
router.post("/funciones", addFuncion);

module.exports = router;