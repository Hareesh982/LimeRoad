const express = require('express')
const router = express.Router()
const {customerDetails, customerLogin, EmailCheckToresetPassword} = require('../controller/userController')

router.post('/register', customerDetails)
router.post('/login', customerLogin)
router.post('/forgot-password',EmailCheckToresetPassword)
 
module.exports = router
