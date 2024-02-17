const express = require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const homeroute = require('./routes/homeroute');
const routes = require('./routes/routes');
const user_login_route = require('./routes/userlogin');
require('./db');
const app = express();
const port=9000;

// To receive input values from a form 
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//setting ejs as default engine
app.set( 'view engine', 'ejs' );

//middlewares: It will execute before any route is executed.

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render('error', { error: err });
// });

//routes: It will execute after all the middlewares are executed.
app.use('/',user_login_route);
app.use('/home',homeroute);
app.use('/book',routes);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})
