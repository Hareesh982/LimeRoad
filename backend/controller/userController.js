const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('../model/customer');
const Vendor = require('../model/vendor');
const Admin = require('../model/admin');

const sendResetMail = require('../mailer/mail');


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




module.exports = {
    customerLogin, 
    EmailCheckToresetPassword, 
    ResetPassword,
    getUserDetails, 
    getCustomerDetails, 
    getVendorDetails, 
};
