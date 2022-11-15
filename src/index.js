const express = require('express');
const mongoose = require('mongoose');
//require('dotenv').config();
const cors = require('cors');


const connectDB = require('./server/db');
// required Routes
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movies');
const extrasRoutes = require('./routes/extras');
const roomsRoutes = require('./routes/rooms');
const exhibitionRoutes = require('./routes/exhibition');
const purchasesRoutes = require('./routes/purchases');
const cartRoutes = require('./routes/cart');
const loginUser = require('./routes/login');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
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

app.use('/api', userRoutes, movieRoutes, extrasRoutes, roomsRoutes, exhibitionRoutes, purchasesRoutes, cartRoutes, loginUser);



// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB();
//mongodb connection
/* mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.log(err));
 */
app.listen(port, () => {
  console.log('Server is running on port ', port);
});

