const express = require('express')
const router = express.Router()
const {userInfo} = require('../controllers/userInfo')
const { protect } = require('../middleware/verifyUser');



router.get('/userInfo', protect, userInfo);


module.exports = router