const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('../model/customer');
const Vendor = require('../model/vendor');
const Admin = require('../model/admin');
const Product = require('../model/products');
const Cart = require('../model/cart');
const Seller = require('../model/seller')
const Order = require('../model/order')
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const sendResetMail = require('../mailer/mail');


const customerDetails = async (req, res) => {
    try {
        let { name, email, mobile, password,userType } = req.body;

        console.log({ name, email, mobile, password,userType })
        email = email.toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);

        if(userType == 'customer'){
            let CustomeremailCheck = await Customer.findOne({ email });
            let customermobileCheck = await Customer.findOne({ mobile });

            if (CustomeremailCheck) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (customermobileCheck) {
                return res.status(400).json({ message: 'Mobile number already in use' });
            }
            let address = {
                pincode : "",
                area :  "",
                landmark : "" ,
                city :    ""  ,
                state :    "" ,
                address_type : ""
            }
            let user = new Customer({name, email, mobile, password: hashedPassword,address,userType});
            await user.save();
            return res.status(201).json({ message: 'Customer registered successfully' });
        }
        else if(userType == 'vendor'){
            let VendoremailCheck = await Vendor.findOne({ email });
            let VendormobileCheck = await Vendor.findOne({ mobile });

            if (VendoremailCheck) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (VendormobileCheck) {
                return res.status(400).json({ message: 'Mobile number already in use' });
            }
            let vendor = new Vendor({ name, email, mobile, password: hashedPassword,userType });
            await vendor.save();
            return res.status(201).json({ message: 'Customer registered successfully' });
        }
        else{
            let AdminemailCheck = await Admin.findOne({ email });
            let AdminmobileCheck = await Admin.findOne({ mobile });

            if (AdminemailCheck) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (AdminmobileCheck) {
                return res.status(400).json({ message: 'Mobile number already in use' });
            }

            let admin = new Admin({ name, email, mobile, password: hashedPassword,userType });
            await admin.save();
            return res.status(201).json({ message: 'Customer registered successfully' });
        }
        
    } 
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//---------------------------------Check mail function-------------------------------------------------

async function checkEmail(email) {
    let user_customer = await Customer.findOne({ email });
    let user_vendor = await Vendor.findOne({ email });
    let user_admin = await Admin.findOne({ email });

    if (!user_customer) {
        if (!user_vendor) {
            if (!user_admin) {
                return null;
            } else {
                return user_admin;
            }
        } else {
            return user_vendor;
        }
    } else {
        return user_customer;
    }
}


//-----------------------------Log in function----------------------------------------------

const customerLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        console.log({ email, password });
        email = email.toLowerCase();
        let response_message = 'Invalid email or password';
        let user = await checkEmail(email);

        if (!user) {
            return res.status(400).json({ message: response_message });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = payload;
       
        next();
    });

};




//--------------------------------Mail sender function------------------------------------


const EmailCheckToresetPassword = async(req,res) =>{
    try{
        let {email} = req.body
        email = email.toLowerCase();
        
        let response_message = 'email not found'
        let user = await checkEmail(email)
        if (!user) {
            return res.status(400).json({ message: response_message });
        }
        await sendResetMail(email,'http://localhost:3000/reset-password')
        
        return res.status(201).json({message : 'we have send a reset password Link to youe email : '})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//------------------------------Password reset function-------------------------------------

const ResetPassword = async(req,res) =>{
    try{
        let {email,password} = req.body
        email = email.toLowerCase();
        
        let user = await checkEmail(email)

        if (!user) {
            return res.status(400).json({message_subject : "email", message: 'Email not found' });
        }

        let isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            return res.status(400).json({message_subject : "password",message : 'Dont use old password'})
        }

        const newPassword = await bcrypt.hash(password, 10);
        user.password = newPassword;
        await user.save();
        return res.status(200).json({message : 'Password changed successfully'})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};




//-------------------------user details------------------------------

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await Customer.findById(userId) || await Vendor.findById(userId) || await Admin.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCustomerDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await Customer.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getVendorDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await Vendor.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getClothingDetails = async (req,res) =>{
    try{
        let user = await Product.find({})
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}



const uploadProducts = async(req,res) =>{
    try{
        let { title, price, description, category, subcategory, rating, brand, vendor_id, inventory_quantity } = req.body;
        console.log({ title, price, description, category, subcategory, rating, brand, vendor_id, inventory_quantity });
        let size;
        if (category === 'men' || category === 'women') {
            size = ['S', 'M', 'L', 'XL'];
        } else {
            size = ['5 years', '8 years', '10 years', '12 years', '14 years'];
        }

        let stock_quantity = 0;
        let available_quantity = inventory_quantity;

        console.log('Files received:', req.files);

        const formatImagePath = (filename) => `http://localhost:3005/uploads/${filename}`;

        let image_path = req.files['file1'] ? formatImagePath(req.files['file1'][0].filename) : null;
        let image_2path = req.files['file2'] ? formatImagePath(req.files['file2'][0].filename) : null;
        let image_3path = req.files['file3'] ? formatImagePath(req.files['file3'][0].filename) : null;

        if (!image_path || !image_2path || !image_3path) {
            return res.status(400).json({ message: 'All three image files are required' });
        }

        console.log('File paths:', image_path, image_2path, image_3path);

        let product = new Product({
            title,
            price,
            description,
            category,
            subcategory,
            image: image_path,
            image_2: image_2path,
            image_3: image_3path,
            rating: { rate: rating },
            size,
            brand,
            vendor_id,
            inventory_quantity,
            stock_quantity,
            available_quantity
        });
        await product.save();
        return res.status(201).json({ message: 'Product uploaded successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

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

const UpdateAddress = async(req,res) =>{
    try{
        let {pincode,mobile,fullname,area,landmark,city,state,addresstype} = req.body

        console.log({pincode,mobile,fullname,area,landmark,city,state,addresstype})

        const userId = req.user.id;
        console.log(userId)
        const user = await Customer.findById(userId)
        user.address = {pincode,mobile,fullname,area,landmark,city,state,addresstype}
        await user.save()
        return res.status(201).json({message : 'Address updated for delivery'})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const getSellerCard = async(req,res) =>{
    try{
        let user = await Seller.find({})
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

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
                unit_amount : Math.round(product.price),    
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

module.exports = { 
    customerDetails, 
    customerLogin, 
    EmailCheckToresetPassword, 
    ResetPassword, 
    verifyToken, 
    getUserDetails, 
    getCustomerDetails, 
    getVendorDetails, 
    getClothingDetails, 
    uploadProducts,
    postCartData,
    getCartData,
    UpdateAddress,
    getSellerCard,
    PaymentStatus,
    UpdateCart
};
