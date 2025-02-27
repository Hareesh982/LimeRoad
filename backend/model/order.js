const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    OrderItems: [
        {
            _id: { type: String, required: true },
            selectedSize: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
        }
    ],
});


module.exports = mongoose.model('Order', OrderSchema, 'order');
