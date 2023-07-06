const express = require('express')
const router = express.Router()
const {SendBooks , getBooks} = require('../controllers/books')

router.route('/sendBooks').post(SendBooks); 

router.route('/getBooks').get(getBooks); 

module.exports = router