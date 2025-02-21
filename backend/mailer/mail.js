const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transport = nodemailer.createTransport({
    secure : true,
    host : 'smtp.gmail.com',
    port : 465,
    auth : {
        user : 'hareeshduddupudi@gmail.com',
        pass : process.env.EMAIL_PASS
    }
});

const sendResetMail = async (email, resetLink) =>{
    try{
        await transport.sendMail({
            from : process.env.EMAIL_USER,
            to : email,
            subject : 'Password Reset Request',
            html : `<p>click here to reser your password : ${resetLink}</p>`
        })
    }
    catch(error){
        console.log(error)
    }
}

module.exports = sendResetMail