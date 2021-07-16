const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

//midle-wear for http requests starting  with /products
app.use('/products', productRoutes);

//midle-wear for http requests starting with /orders
app.use('/orders', orderRoutes);

module.exports = app;