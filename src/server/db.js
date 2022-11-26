const mongoose = require('mongoose');
const { dirname } = require('path');
require('dotenv').config({ path: __dirname+'/../.env' });
//mongodb connection
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('MongoDB connected');
        });
    }
    catch (error) {
        console.log("Could not connect to DB", error);
    }
}

module.exports = connectDB;