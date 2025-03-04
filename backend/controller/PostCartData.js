
const Cart = require('../model/cart')

const postCartData = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('user customer id :', userId);
        console.log('Request body:', req.body);

        const { cartItems, cartCounter, totalPrice, deliveryCharges, taxes, grandTotal } = req.body;
        console.log({ cartItems, cartCounter, totalPrice, deliveryCharges, taxes, grandTotal });

        const products = cartItems.map(item => ({
            _id: item._id,
            selectedSize: item.selectedSize,
            quantity: item.quantity,
            price: item.price,
            total_item_price: item.total_item_price,
            title:item.title,
            description : item.description,
            image : item.image
        }));

        console.log('Received cart data:', { userId, products, cartCounter, totalPrice, deliveryCharges, taxes, grandTotal });

        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.cartItems = products;
            cart.cartCounter = cartCounter;
            cart.totalPrice = totalPrice;
            cart.deliveryCharges = deliveryCharges;
            cart.taxes = taxes;
            cart.grandTotal = grandTotal;
            cart.OrderStatus = 'pending'
        } else {
            cart = new Cart({
                userId,
                cartItems: products,
                cartCounter,
                totalPrice,
                deliveryCharges,
                taxes,
                grandTotal,
                OrderStatus : 'pending'
            });
        }

        await cart.save();
        console.log('Cart data saved successfully');
        return res.status(201).json({ message: 'Cart data saved successfully' });
    } catch (error) {
        console.error('Error saving cart data:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = postCartData