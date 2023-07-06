const express = require('express')
const router = express.Router()
const {Login , SignUp} = require('../controllers/Auth')


router.route('/SignUp').post(SignUp);

router.route('/Login').post(Login); 


module.exports = router