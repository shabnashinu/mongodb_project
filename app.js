const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect('mongodb://localhost:27017/sample');

const UserSchema = new mongoose.Schema({
    name: String, 
    age: Number
});

const UserModel = mongoose.model("users", UserSchema);

app.get("/", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        console.log(err);
    });
});

app.listen(3000, () => {
    console.log("server started");
});
