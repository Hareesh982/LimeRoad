const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    fullname :  {type : String, required : true},
    email :     {type : String, required : true},
    mobile :    {type : String, required : true},
    ctegory :   {type : String, required : true},
    subctegory :{type : String, required : true},
    brand_image :{type : String, required : true},
    password :  {type : String, required : true}
})

module.exports = mongoose.model('Vendor', vendorSchema, 'vendor')