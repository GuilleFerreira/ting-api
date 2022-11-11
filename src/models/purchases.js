const mongoose = require('mongoose');

const purchasesSchema = mongoose.Schema({
    username : {
        type: String,
    },
    qr : {
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
    }
});

module.exports = mongoose.model('Purchases', purchasesSchema);