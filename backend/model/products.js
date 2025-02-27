const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  price:      { type: Number, required: true },
  description:{ type: String, required: true },
  category:   { type: String, required: true },
  subcategory:{ type: String, required: true },
  image:      { type: String, required: true },
  image_2:    { type: String, required: true },
  image_3:    { type: String, required: true },
  rating:     {
                rate: { type: Number, required: true }
              },
  size:       [{ type: String, required: true }],
  brand:      { type: String, required: true },
  vendor_id:  { type: String, required: true },
  inventory_quantity : {type: Number, required : true},
  stock_quantity : {type : Number, required : true},
  available_quantity : {type : Number, required : true}
});


module.exports = mongoose.model('Product', productSchema,'products');
