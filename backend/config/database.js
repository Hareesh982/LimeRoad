
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_CONNECTION)
        console.log("---> 1. connected to MongoDB")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectDB
