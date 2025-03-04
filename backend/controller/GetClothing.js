
const Product = require('../model/products')

const getClothingDetails = async (req,res) =>{
    try{
        let user = await Product.find({})
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = getClothingDetails