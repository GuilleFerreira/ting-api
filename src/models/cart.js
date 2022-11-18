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
        extra : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'extras',
        },
        quantity: {
            type: Number,
        }
    }],
});

module.exports = mongoose.model('Cart', cartSchema);