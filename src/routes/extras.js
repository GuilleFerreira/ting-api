const express = require("express");
const extrasSchema = require("../models/extras");

const router = express.Router();

// obtener todos los extras
router.get("/extras", (req, res) => {
    extrasSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// crear extra
router.post("/extras", (req, res) => {
    const extra = extrasSchema(req.body);
    extra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener extra por id
router.get("/extras/:id", (req, res) => {
    const { id } = req.params;
    extrasSchema
        .find({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// obtener precio del extra por id
router.get("/extras/price/:id", (req, res) => {
    const { id } = req.params;
    extrasSchema
        .find({ id: id }).select({"_id": 0,"price": 1})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// actualizar extra por id
router.put("/extras/:id", (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    extrasSchema
        .updateOne({ id: id }, { $set: { price: price}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

// eliminar extra por id
router.delete("/extras/:id", (req, res) => {
    const {  id } = req.params;
    extrasSchema
        .remove({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;