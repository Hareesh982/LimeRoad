const express = require('express')
const router = express.Router()
const upload = require('../fileStorage/storage')

const verifyToken    =   require('../middleware/auth')
const Registration   =   require('../controller/registerController')
const UpdateCart     =   require('../controller/UpdateCartController')
const PaymentStatus  =   require('../controller/PaymentStatusController')
const getSellerCard  =   require('../controller/SellerCardController')
const UpdateAddress  =   require('../controller/AddressController')
const getCartData    =   require('../controller/CartData')
const postCartData   =   require('../controller/PostCartData')
const getClothingDetails = require('../controller/GetClothing')
const uploadProducts = require('../controller/UploadProducts')

const {
    customerLogin, 
    EmailCheckToresetPassword, 
    ResetPassword, 
    getUserDetails,
    getCustomerDetails,
    getVendorDetails,
} = require('../controller/userController')



router.post('/register',        Registration                )

router.post('/login',           customerLogin               )

router.post('/forgot-password', EmailCheckToresetPassword   )

router.post('/reset-password',  ResetPassword               )

router.get('/user-details',     verifyToken,    getUserDetails)

router.get('/customer-details', verifyToken,    getCustomerDetails)

router.get('/vendor-details',   verifyToken,    getVendorDetails)

router.get('/clothing-details', getClothingDetails)

router.get('/seller-card',      getSellerCard)

router.post('/upload-products', upload.fields([{name : 'file1'},{name : 'file2'},{name : 'file3'}]),    uploadProducts)

router.post('/api/cart',        verifyToken,    postCartData)

router.get('/api/cartData',     verifyToken,    getCartData)

router.put('/api/customeraddress',  verifyToken,UpdateAddress)

router.post('/api/payment-status',  verifyToken,PaymentStatus)

router.get('/api/update-cart',  verifyToken,    UpdateCart)


module.exports = router


