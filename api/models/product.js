const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    thumbnail: String,
    chef:{
        name:String,
        specialty:String,
        pfp:String
    },
    duration: String,
    rating: String,
    level: String

});

module.exports = mongoose.model('Product', productSchema);

