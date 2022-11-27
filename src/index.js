const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./server/db');

// required Routes
const movieRoutes = require('./routes/movies');
const extrasRoutes = require('./routes/extras');
const exhibitionRoutes = require('./routes/exhibition');
const purchasesRoutes = require('./routes/purchases');
const cartRoutes = require('./routes/cart');
const loginUser = require('./routes/auth');
const payment = require('./routes/payment');
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }
});

app.use('/api', movieRoutes, extrasRoutes, exhibitionRoutes, purchasesRoutes, cartRoutes, loginUser, payment);

// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB();

app.listen(port, () => {
  console.log('Server is running on port ', port);
});

