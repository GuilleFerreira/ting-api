const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
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