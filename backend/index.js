const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./routes/userRoutes')
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser');

connectDB()
dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT


app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`server running at http://127.0.0.1:${PORT}`)
})






