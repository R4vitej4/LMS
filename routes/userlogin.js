const express = require('express');
const user_login_route = express.Router();
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const homeroute = require('./homeroute');
const secret = process.env.jwt_secret;
// Error handling middleware (defined first)
user_login_route.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

user_login_route.get('/',(req,res)=>{
  res.render('login');
})

user_login_route.post('/signup',async(req,res)=>{
  try{
    const {username,password}=req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newuser=new user({
      username:username,
      password:hashedPassword
    });
    console.log("user registered successfully");
    await newuser.save();

    res.redirect('/');
  }
  catch(err){
    console.log(err);
  }
})

user_login_route.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body;
   
    // Find the user by username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
       next(err); // Pass the error to the error handling middleware
      return res.status(401).send('Invalid password');
    }
    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: '1h' });
    res.redirect('/home');
  }
  catch(err){
    console.log(err);
  }
})

user_login_route.get('/login', (req, res) => {
  // Render your login page here
  res.render('login');
});

user_login_route.get('/signup', (req, res) => {
  // Render your login page here
  res.render('login');
});


module.exports=user_login_route;