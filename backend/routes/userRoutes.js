const express = require('express')
const router = express.Router()
const upload = require('../fileStorage/storage')

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
    getSellerCard,
    PaymentStatus,
    UpdateCart
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
router.post('/upload-products',upload.fields([{name : 'file1'},{name : 'file2'},{name : 'file3'}]),uploadProducts)
router.post('/api/cart',verifyToken,postCartData)
router.get('/api/cartData',verifyToken,getCartData)
router.put('/api/customeraddress',verifyToken,UpdateAddress)
router.post('/api/payment-status',verifyToken,PaymentStatus)
router.get('/api/update-cart',verifyToken,UpdateCart)


module.exports = router


