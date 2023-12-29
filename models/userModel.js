const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'user' }
});




const userSchema1 = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: String },
  path:{type:String}
});

const profileschema = new mongoose.Schema({
  userID:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  name: {type:String},
  address: {type:String},
  place:{type:String},
  phone:{type:String},
});

const User = mongoose.model('User', userSchema);
const product = mongoose.model('product', userSchema1);
const profile = mongoose.model('Profile', profileschema);

module.exports = {User,product,profile}
// module.exports = User;


