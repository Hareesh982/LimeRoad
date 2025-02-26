const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:          { type: String, required: true },
    category:       { type: String, required: true },
    sub_category:   { type: String, required: true },
    likes :         { type: Number, required: true },
    image:          { type: String, required: true },
    profile_image : { type: String, required: true },
    seller_name :   { type: String, required: true },
    followers :     { type: String, required: true }
});
 

module.exports = mongoose.model('Seller', productSchema,'seller');
