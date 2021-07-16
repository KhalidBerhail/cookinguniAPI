const express = require('express');
const router = express.Router();

//route for get request on /orders
router.get('/', (req, res,next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});


//route for post request
router.post('/', (req, res,next) => {
    const order = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        productId: req.body.productId
    };

    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});

//route for get request with order ID
router.get('/:orderId', (req, res,next) => {
    res.status(200).json({
        message: 'order details',
        orderId: req.params.orderId
    });
});

//route dor delete reques with order ID
router.delete('/:orderId', (req, res,next) => {
    res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderId
    });
});





module.exports = router;

