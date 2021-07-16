const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

//route for get request with product id
router.get('/:productId', (req, res,next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

//route for patch request with product id
router.patch('/:productId', (req, res,next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

//route for delete request with product id
router.delete('/:productId', (req, res,next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;

