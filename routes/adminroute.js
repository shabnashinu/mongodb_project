const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admincontroller')

const multer = require('../models/multer')

router.get('/adminhome',admincontroller.admin);
router.post('/addproduct',multer.single('image'),admincontroller.addproduct)
router.post('/update/:productid',admincontroller.updatepost)
router.post('/deleteProduct/:productid',admincontroller.deleteProduct)

module.exports = router;

