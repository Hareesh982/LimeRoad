
const Seller = require('../model/seller')

const getSellerCard = async(req,res) =>{
    try{
        let user = await Seller.find({})
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = getSellerCard