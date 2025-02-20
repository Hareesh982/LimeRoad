let Customer = require('../model/customer');
const bcrypt = require('bcrypt');
const sendResetMail = require('../mailer/mail')

const customerDetails = async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;

        email = email.toLowerCase();
        
        let emailCheck = await Customer.findOne({ email });
        let mobileCheck = await Customer.findOne({ mobile });

        if (emailCheck) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (mobileCheck) {
            return res.status(400).json({ message: 'Mobile number already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = new Customer({ name, email, mobile, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'Customer registered successfully' });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const customerLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.toLowerCase();
        
        let user = await Customer.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const EmailCheckToresetPassword = async(req,res) =>{
    try{
        let {email} = req.body
        email = email.toLowerCase();
        console.log(email)
        let user = await Customer.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }
        await sendResetMail(email,'http://localhost:3000/reset-password')
        
        return res.status(201).json({message : 'Email found'})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { customerDetails, customerLogin, EmailCheckToresetPassword };
