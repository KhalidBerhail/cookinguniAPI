const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//Connecting to our database
mongoose.connect(
  "mongodb+srv://kurolo:" +
    process.env.MONGO_PWD +
    "@cluster0.1oohb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser :true,
        useUnifiedTopology: true
    }
);

app.use(morgan("dev"));
//Body parsser middleware for url encoded data (simple bodies support only hince why "false")
app.use(bodyParser.urlencoded({ extended: false }));

//Body parsser middleware for json data
app.use(bodyParser.json());

//middleware for handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Controm-Allow-Origin", "*");
  res.header(
    "Acces-Controm-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//middleware for http requests starting  with /products
app.use("/products", productRoutes);

//middleware for http requests starting with /orders
app.use("/orders", orderRoutes);

//middleware to handle errors (incase none of the other midle-wears were reached)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//middleware to handle all errors thrown by the app
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
