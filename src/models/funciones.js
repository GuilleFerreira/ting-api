const mongoose = require('mongoose');

const funcionesSchema = mongoose.Schema({
    id: {
        type: String,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
    },
    theater: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    price: {
        type: Number,
    },
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
    }],
    seatsunavailable: [{
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
    }]
});

module.exports = mongoose.model('Funciones', funcionesSchema);