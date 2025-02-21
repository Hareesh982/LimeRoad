const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name     :  {type : String, required : true},
    email    :  {type : String, required : true},
    mobile   :  {type : String, required : true},
    password :  {type : String, required : true}
})

module.exports = mongoose.model('Vendor', vendorSchema, 'vendor')