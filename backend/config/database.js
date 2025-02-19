
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION)
        .then(() => console.log("---> 1. connected to MongoDB"))
        .catch(() => console.log("---> 1. Error in database connection"))
}

module.exports = connectDB
