const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    img: String,
    chef:{
        name:String,
        specialty:String
    }
});

module.exports = mongoose.model('Product', productSchema);