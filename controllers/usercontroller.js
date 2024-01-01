const bcrypt = require('bcrypt');
const {User} =require('../models/userModel');
const {product} = require('../models/userModel');
const {profile} = require ('../models/userModel')
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

//signup
const signup = (req,res)=>{
    if(!req.session.userprofile){
        res.render('signuppage')
    }
    else if(!req.session.isAdmin){
        res.redirect('/userhomepage')
    }
    else{
        res.redirect('/adminhome')
    }
   
}

//login
const loginpage = (req,res)=>{
    res.render('loginpage')
}

//productpage
const productpage = async(req,res)=>{
    
    const pd = await product.find({});

    res.render('productpage',{pd})
}

//userprofile
const userprofile = async(req,res)=>{
    const user=await User.findOne({_id:req.session.userprofile});
    console.log("--------------------user_______________");
    console.log(user);
    const id = user._id;
    const profile = await User.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(id)}},
        {
            $lookup:{
                from:"profiles",
                localField:"_id",
                foreignField:"userID",
                as:"profileDetails"

            }
        }


    ])
    console.log(profile);
    res.render('profile',{profile})
};







//showprofile
const showprofile = async(req, res) => {
    const user=await User.findOne({_id:req.session.userprofile});
    console.log("--------------------user_______________");
    console.log(user);
    const id = user._id
    const profile = await User.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(id)}},
        {
            $lookup:{
                from:"profiles",
                localField:"_id",
                foreignField:"userID",
                as:"profileDetails"

            }
        }


    ])
    res.render('showprofile',{user,profile});
}

//userhomepage
const userhomepage = (req,res)=>{
    res.render('userhomepage')
}

//addproduct
const addproduct = (req,res)=>{
    res.render('addproduct')
}

//viewusers
const viewusers =async (req,res)=>{
   const data=await User.find()
    res.render('viewusers',{data})

}

//updateproduct
const updateproduct = async (req,res)=>{
    const updatedata = req.params.id
    console.log(req.params.id);
    console.log(updatedata);
    const update = await product.findOne({_id:updatedata})
    console.log(update);
    res.render('update',{update})
}









const usercreate = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
  
    // Backend validation
    if (!email || !password || !confirmPassword) {
      return res.redirect('/')
    }
  
    if (password !== confirmPassword) {
      return res.redirect('/')
    }
  
    // Additional validation checks can be added here
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.redirect('/login');
      }
      
      //encrypt password
      const hashedpassword =await bcrypt.hash(password,10)
  
      // Create a new user and save to the database
      const newUser = new User({ email, password:hashedpassword});
      console.log(newUser);
      await newUser.save();

    //   req.session.email=loginuser.email
      req.session.userprofile=newUser._id
      res.redirect('/userhomepage');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


 const  login = async(req,res)=>{
    const {email,password}=req.body
    console.log(email);
    try{
        //find user by email
        

        const loginuser = await User.findOne({email})
        console.log(loginuser);

        if(!loginuser){
            req.session.message ="No user found"
            console.log("shin");
            return res.redirect('/login')
            
        }
        //compare hashed passwords
        const passwordmatch = await bcrypt.compare(password,loginuser.password)
        console.log(passwordmatch);
        
        if(!passwordmatch){
            req.session.message = "incorrect"
            console.log("shinu");
            return res.redirect('/login')
            

        }
        //set user session
        req.session.userprofile = loginuser._id
        //check user type
        if(loginuser.userType === 'admin'){
           
            req.session.isAdmin = true;
            res.redirect('/adminhome')
            console.log("shinooos");

        }
        else{
            req.session.userprofile = loginuser._id
            req.session.email=loginuser.email
            console.log(req.session);
            res.redirect('/userhomepage')
        }
        
    }
    catch(err){
        res.status(500).send('error during login: ${err.message}')
    }
 }


 //controller for logout
 const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error destroying session", err);   
            res.sendStatus(500); 
        } else {
            res.redirect('/login');
        }
    });
};

const editprofile =async(req,res)=>{
    console.log();
    const user = await User.findOne({_id:req.session.userprofile})
    
    const userID = user._id;
    const {name,address,place,phone,}=req.body

    await profile.updateOne({userID},
    {$set:{name,address,place,phone,}},
    {upsert:true})
    res.redirect('/showprofile')

}






module.exports={
    signup,
    loginpage,
    productpage,
    userprofile,
    userhomepage,
    usercreate,
    login,
    logout,
    addproduct,
    viewusers,
    updateproduct,
    showprofile,
    editprofile
 
}