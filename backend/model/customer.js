const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    fullname : {type : String, required: true},
    email    : {type : String, required : true},
    mobile   : {type : String, required : true},
    password : {type : String, required : true}
})

module.exports = mongoose.model('Customer',customerSchema, 'customers')
