const express = require('express');
const router = express.Router();
const Book = require('../Models/bookModel');
const home = require('./homeroute');
const user = require('../Models/userModel');


router.post('/',async (req,res)=>{
  try{
    const {BookName,BookAuthor,BookPages,BookPrice}=req.body;
    const newBook=new Book({
      BookName:BookName,
      BookAuthor:BookAuthor,
      BookPages:BookPages,
      BookPrice:BookPrice
    });
    await newBook.save();
    res.redirect('/home');
  } 
  catch(err){
    console.log(err);
  }
});

router.post('/issue',async(req,res)=>{
  try{
    const {BookName}=req.body;
    console.log(req.body); 
    const book=await Book.findOne({BookName:BookName});
    console.log("bookname is: "+book);
    if(!book){
      res.status(404).send("Book not found"); 
    }
    book.BookState="Issued";
    await book.save();
    res.redirect('/home');
  }
  catch(err){
    console.log(err);
  }
})

router.post('/return',async(req,res)=>{
  try{
    const {BookName}=req.body;
    const book=await Book.findOne({BookName:BookName});
    if(!book){
      res.status(404).send("Book not found"); 
    }
    book.BookState="Available";
    await book.save();
    res.redirect('/home');
  }
  catch(err){
    console.log(err);
  }
})

router.post('/delete',async(req,res)=>{
  try{
    const {BookName}=req.body;
    console.log("Bookname is : "+BookName);
    
    // Find the book by name and delete it
    const result = await Book.deleteOne({ BookName: BookName });
    res.redirect('/home');
  }
  catch(err){
    console.log(err);
  }
})



module.exports=router;