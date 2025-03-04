
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const PaymentStatus = async(req,res) =>{
    
    try{
        let { products } = req.body;
        console.log('Products:', products);

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products found in the request' });
        }

        
        const lineItems = products.map((product) => ({
            price_data : {
                currency : "inr",
                product_data : {
                    name : product.title,
                    images : [product.image]
                },
                unit_amount : Math.round(product.price)*100,    
            },
            quantity : product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : lineItems,
            mode : "payment",
            success_url : "http://localhost:3000/success",
            cancel_url : "http://localhost:3000/cancel"
        });

        return res.status(200).json({id : session.id});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = PaymentStatus