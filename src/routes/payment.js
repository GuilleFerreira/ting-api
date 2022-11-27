const express = require("express");
const verifyToken = require('../controllers/auth');
const { payment } = require('../controllers/payment');
const router = express.Router();


router.get("/payment", payment);

module.exports = router;