const express=require('express');
const Book = require('../Models/bookModel');
const router=express.Router();


router.get('/',async (req,res)=>{
  try{
    const books=await Book.find();
    res.render("home",{data: books});
  }  
  catch(err){
    console.log(err);
  }
});


module.exports=router;