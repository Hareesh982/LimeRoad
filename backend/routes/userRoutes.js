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
    uploadProducts,
    postCartData,
    getCartData,
    UpdateAddress,
    getSellerCard
} = require('../controller/userController')


router.post('/register', customerDetails)
router.post('/login', customerLogin)
router.post('/forgot-password',EmailCheckToresetPassword)
router.post('/reset-password',ResetPassword)
router.get('/user-details',verifyToken,getUserDetails)
router.get('/customer-details',verifyToken,getCustomerDetails)
router.get('/vendor-details',verifyToken,getVendorDetails)
router.get('/clothing-details',getClothingDetails)
router.get('/seller-card',getSellerCard)
router.post('/upload-products',uploadProducts)
router.post('/api/cart',verifyToken,postCartData)
router.get('/api/cartData',verifyToken,getCartData)
router.put('/api/customeraddress',verifyToken,UpdateAddress)


module.exports = router


