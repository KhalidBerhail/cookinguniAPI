const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const product = require("../models/product");
const Product = require("../models/product");


//route for GET request
router.get("/", (req, res, next) => {
  Product.find()
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
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    chef: req.body.chef,
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//route for get request with product id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From databse", doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//route for patch request with product id
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndUpdate(id,{$set:req.body}, {new:true})
  .exec()
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({ error: err}));

  
});

//route for delete request with product id
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
  Product.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
  });
});

module.exports = router;
