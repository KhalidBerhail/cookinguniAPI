const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));

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
    error:{
        message: error.message
    }
  });
});

module.exports = app;
