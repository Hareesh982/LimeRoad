const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    customer_id : { type: String, required: true },
    products : { 
        product_id : [{type : String}] ,
        Quantity : {type : Number} },

});


module.exports = mongoose.model('Product', productSchema,'products');