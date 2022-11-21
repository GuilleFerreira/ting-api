const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    username : {
        type: String,
    },
    movie : {
        type: String,
    },
    theater: {
        type: String,
    },
    date : {
        type: String,
    },
    time : {
        type: String,
    },
    exhibition: {
        type: String,
    },
    price: {
        type: Number,
    },
    qrcode: {
        type: String,
    },
    seats : [{
        row: {
            type: Number,
        },
        seat: {
            type: Number,
        },
        empty: {
            type: Boolean,
        },
        available: {
            type: Boolean,
        }
    }],
    selectedExtras: [{
        id : {
            type: String,
        },
        name : {
            type: String,
        },
        price : {
            type: Number,
        },
        quantity: {
            type: Number,
        }
    }],
});

module.exports = mongoose.model('Cart', cartSchema);