const express = require('express')
const router = express.Router()
const {customerDetails, customerLogin, EmailCheckToresetPassword, ResetPassword} = require('../controller/userController')

router.post('/register', customerDetails)
router.post('/login', customerLogin)
router.post('/forgot-password',EmailCheckToresetPassword)
router.post('/reset-password',ResetPassword)
 
module.exports = router
