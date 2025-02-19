const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes/userRoutes')
const connectDB = require('./config/database')

connectDB()
dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT



app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`server running at http://127.0.0.1:${PORT}`)
})






