const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')
const { validateSignup } = require('../middlewares/signupvalidation');

// signup
router.get('/',usercontroller.signup);

//login
router.get('/login',usercontroller.loginpage)

// Product 
router.get('/productpage',usercontroller.productpage);

//userhomepage
router.get('/userhomepage',usercontroller.userhomepage);

//userprofile
router.get('/userprofile',usercontroller.userprofile)

//addproduct
router.get('/addproduct',usercontroller.addproduct)

//viewusers
router.get('/viewusers',usercontroller.viewusers)

//updateproduct
router.get('/update/:id',usercontroller.updateproduct)

//showprofile
router.get('/showprofile',usercontroller.showprofile)

//logout
router.get('/logout',usercontroller.logout)




router.post('/signup',usercontroller.usercreate)

router.post('/login',usercontroller.login)

router.post('/userprofile',usercontroller.editprofile)




module.exports = router;
