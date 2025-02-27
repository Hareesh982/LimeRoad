const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartItems: [
        {
            _id: { type: String, required: true },
            selectedSize: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true },
            total_item_price: { type: Number, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true }
        }
    ],
    cartCounter: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    deliveryCharges: { type: Number, required: true },
    taxes: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    OrderStatus : {type : String, required : true}
});


module.exports = mongoose.model('Cart', CartSchema, 'cart');




