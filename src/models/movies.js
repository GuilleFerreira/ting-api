const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    postImg: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: [{
        type: String,
    }]
});

module.exports = mongoose.model('Movie', movieSchema);