const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// required Routes
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movies');
const extrasRoutes = require('./routes/extras');
const roomsRoutes = require('./routes/rooms');
const exhibitionRoutes = require('./routes/exhibition');
const purchasesRoutes = require('./routes/purchases');

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use('/api', userRoutes, movieRoutes, extrasRoutes, roomsRoutes, exhibitionRoutes, purchasesRoutes);


// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log('Server is running on port ', port);
});

