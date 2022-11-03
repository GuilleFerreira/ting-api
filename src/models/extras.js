const mongoose = require('mongoose');

const extrasSchema = mongoose.Schema({
    id : {
        type: String,
    },
    name : {
        type: String,
    },
    price: {
        type: Number,
    },
    img : {
        type: String,
    }
});

module.exports = mongoose.model('Extras', extrasSchema);