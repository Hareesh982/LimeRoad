const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Customer = require('../model/customer');
const Vendor = require('../model/vendor');
const Admin = require('../model/admin');
const Product = require('../model/products');
const Cart = require('../model/cart');
const Seller = require('../model/seller')
const sendResetMail = require('../mailer/mail');

dotenv.config();


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
    console.log('auth header',authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = payload;
        console.log('user id : ',req.user.id)
        console.log("verified")
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
        console.log(user)

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
        console.log(user)

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
        console.log(user)

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
        let { title, price, description, category, subcategory, image, image_2, image_3, rating, brand, vendor_id } = req.body;
        console.log({ title, price, description, category, subcategory, image, image_2, image_3, rating, brand, vendor_id })
        let size;
        if (category === 'men' || category === 'women') {
            size = ['S', 'M', 'L', 'XL'];
        } else {
            size = ['5 years', '8 years', '10 years', '12 years', '14 years'];
        }

        let product = new Product({
            title,
            price,
            description,
            category,
            subcategory,
            image,
            image_2,
            image_3,
            rating: { rate: rating },
            size, 
            brand,
            vendor_id
        });
        await product.save()
        return res.status(201).json({ message: 'product uploaded successfully' });

    }
    catch(error){
        console.log(error)
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
        } else {
            cart = new Cart({
                userId,
                cartItems: products,
                cartCounter,
                totalPrice,
                deliveryCharges,
                taxes,
                grandTotal
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
        return res.status(201).json({message : 'data came succesfully'})
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
    getSellerCard
};
