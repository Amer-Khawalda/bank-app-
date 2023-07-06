const express = require('express')
const router = express.Router()
const { addBooks , deleteBooks , getBooks} = require('../controllers/userList')
const { protect } = require('../middleware/verifyUser');

router.post('/addBooks', protect, addBooks);

router.delete('/deleteBooks', protect, deleteBooks);

router.get('/getBooks', protect, getBooks);

module.exports = router