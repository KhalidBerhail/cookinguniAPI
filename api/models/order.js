const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _productId: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('Order', orderSchema);