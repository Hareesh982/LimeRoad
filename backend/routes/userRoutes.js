const express = require('express')
const router = express.Router()
const {
    customerDetails, 
    customerLogin, 
    EmailCheckToresetPassword, 
    ResetPassword, 
    verifyToken,
    getUserDetails,
    getCustomerDetails,
    getVendorDetails,
    getClothingDetails,
    uploadProducts
} = require('../controller/userController')

router.post('/register', customerDetails)
router.post('/login', customerLogin)
router.post('/forgot-password',EmailCheckToresetPassword)
router.post('/reset-password',ResetPassword)
router.get('/user-details',verifyToken,getUserDetails)
router.get('/customer-details',verifyToken,getCustomerDetails)
router.get('/vendor-details',verifyToken,getVendorDetails)
router.get('/clothing-details',getClothingDetails)
router.post('/upload-products',uploadProducts)
 
module.exports = router


