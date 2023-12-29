const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require('express-session');
const admin = require('./routes/adminroute');
const router = require('./routes/userroutes');
const profile = require('./routes/profile');
const bodyParser = require('body-parser');
const path=require('path')
const nocache = require("nocache");


const app = express();
app.use(nocache());

// Use the session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/sample');

// This sets up a route for the root path ("/"). When a GET request is made to the root path,
// the server retrieves all documents from the "users" collection using UserModel.find({}). 
// The retrieved users are then sent as a JSON response using res.json(users).
// app.get("/", (req, res) => {
//     UserModel.find({}).then(function(users) {
//         res.json(users);
//     }).catch(function(err){
//         console.log(err);
//     });
// });

// '/admin/login'
// '/user/login'
'/login'

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/', router)
app.use('/',admin)

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use('/public', express.static('public'));
app.use('/styles', express.static('styles'));
app.use('/validation',express.static('validation'));



app.listen(3000, () => {
    console.log("server started");
});


