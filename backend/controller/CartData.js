
const Cart = require('../model/cart')

const getCartData = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const { cartItems, cartCounter, totalPrice, deliveryCharges, taxes, grandTotal } = cart;
        return res.status(200).json({ cartItems, cartCounter, totalPrice, deliveryCharges, taxes, grandTotal });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = getCartData