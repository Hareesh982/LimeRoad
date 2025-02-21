const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Customer = require('../model/customer');
const Vendor = require('../model/vendor')
const Admin = require('../model/admin')

const sendResetMail = require('../mailer/mail')



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

            let user = new Customer({ name, email, mobile, password: hashedPassword,userType});
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

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = payload;
        next();
    });

    // let token = req.header("Authorization")
    // if(token){
    //     let payload = jwt.verify(token,process.env.JWT_SECRET)
    //     console.log(payload.id)
    //     let user = await User.findById(payload.id)
    //     console.log(user)
    //     req.user = user
    //     next()
    // }
    // else{
    //     res.send('no access')
    // }
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
        
        return res.status(201).json({message : 'Email found'})
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
        const newPassword = await bcrypt.hash(password, 10);
        let response_message = 'Email not found'
        let user = await checkEmail(email)

        if (!user) {
            return res.status(400).json({ message: response_message });
        }

        user.password = newPassword;
        await user.save();
        return res.status(201).json({message : 'Password changed successfully'})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


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

module.exports = { customerDetails, customerLogin, EmailCheckToresetPassword, ResetPassword, verifyToken, getUserDetails };
