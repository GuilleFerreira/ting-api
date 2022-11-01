const express = require("express");

const router = express.Router();

// crear usuario
router.post("/users", (req, res) => {
    res.send("Creando usuario");
});


module.exports = router;