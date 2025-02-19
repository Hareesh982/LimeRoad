
let Customer = require('../model/customer')
let Vendor = require('../model/vendor')

const customerDetails = async (req,res) =>{
    let {fullname,email,mobile,password} = req.body
    console.log({fullname,email,mobile,password});
    
    let user = new Customer({fullname,email,mobile,password})
    await user.save()
    res.status(200).send('customer registered succesfully')
}

const vendorDetails = async (req,res) =>{
    let {name,email,password} = req.body
    console.log({name,email,password});
    
    let user = new Vendor({name,email,password})
    await user.save()
    res.status(200).send('vendor registered succesfully')
}

module.exports = {customerDetails, vendorDetails}
