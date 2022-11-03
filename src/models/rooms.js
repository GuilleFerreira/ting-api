const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    room_id:{
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
    }]
});

module.exports = mongoose.model('Rooms', roomsSchema);