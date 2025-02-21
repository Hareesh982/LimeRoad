const express = require('express')
const router = express.Router()
const {
    customerDetails, 
    customerLogin, 
    EmailCheckToresetPassword, 
    ResetPassword, 
    verifyToken,
    getUserDetails
} = require('../controller/userController')

router.post('/register', customerDetails)
router.post('/login', customerLogin)
router.post('/forgot-password',EmailCheckToresetPassword)
router.post('/reset-password',ResetPassword)
router.get('/user-details',verifyToken,getUserDetails)
 
module.exports = router


