const express = require("express");
const { postLogin } = require('../controllers/auth');

const router = express.Router();

// get todos los usuarios
router.post("/login", postLogin);
module.exports = router;