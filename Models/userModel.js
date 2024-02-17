const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

// Create a model from the schema
const user = mongoose.model('user',userSchema);
module.exports = user;