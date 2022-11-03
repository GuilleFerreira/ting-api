const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    id: {
        type: String,
    },
    postImg: {
        id: {
            type: String,
        },
        url: {
            type: String,
        },
        urlWide: {
            type: String,
        },
        alt: {
            type: String,
        }
    },
    name: {
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