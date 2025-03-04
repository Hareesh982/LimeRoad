
const Cart = require('../model/cart')
const Order = require('../model/order')
const Product = require('../model/products')

const AvailableStock = async(OrderItems) => {
    for(let item of OrderItems){
        let product = await Product.findById(item._id)
        if(product){
            product.stock_quantity = product.stock_quantity + item.quantity
            product.available_quantity = product.inventory_quantity - product.stock_quantity
            await product.save()
        }
    }
}

const UpdateCart = async(req,res) =>{
    let customer_id = req.user.id

    try{
        OrderItems = [];
        let cart = await Cart.findOne({userId : customer_id});

        if(!cart){
            return res.status(400).json({message : 'No products in your cart'});
        }

        cart.cartItems.map(item => OrderItems.push({_id : item._id,selectedSize : item.selectedSize,quantity : item.quantity}));
        let order = new Order({userId : customer_id,OrderItems});

        await order.save();

        await AvailableStock(OrderItems);

        await cart.deleteOne({userId:customer_id});
        return res.status(200).json({message : 'Your cart has been updated'});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}



module.exports = UpdateCart