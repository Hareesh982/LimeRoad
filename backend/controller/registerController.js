const Customer = require('../model/customer')
const Vendor = require('../model/vendor')
const Admin = require('../model/admin')
const bcrypt = require('bcryptjs');

const Registration = async (req, res) => {
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

module.exports = Registration