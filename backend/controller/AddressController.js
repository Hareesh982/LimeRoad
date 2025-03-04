
const Customer = require('../model/customer')

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

module.exports = UpdateAddress