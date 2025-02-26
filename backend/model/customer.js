const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name     : {type : String, required : true},
    email    : {type : String, required : true},
    mobile   : {type : String, required : true},
    password : {type : String, required : true},
    address : {
        pincode  :  {type : String},
        mobile   :  {type : String},
        fullname :  {type : String},
        area     :  {type : String},
        landmark :  {type : String},
        city     :  {type : String},
        state    :  {type : String},
        addresstype : {type : String }
    },
    userType : {type : String, required : true}
})

module.exports = mongoose.model('Customer',customerSchema, 'customers')


