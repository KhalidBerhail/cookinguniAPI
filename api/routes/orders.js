const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");

//route for get request on /orders
router.get("/", (req, res, next) => {
  Order.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//route for POST request
router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    _productId: req.body._productId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /orders",
        createdOrder: order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//route for get request with order ID
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((doc) => {
      console.log("From databse", doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//route dor delete reques with order ID
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
