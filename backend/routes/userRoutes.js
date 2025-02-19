const express = require('express')
const router = express.Router()
const {customerDetails,vendorDetails} = require('../controller/userController')

router.post('/customerregister',customerDetails)
router.post('/vendorregister', vendorDetails)

module.exports = router