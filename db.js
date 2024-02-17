const mongoose = require('mongoose');



const dbConnection =()=>{
  const db= process.env.db_connection;
  mongoose.connect(db)
  .then(()=>{
    console.log("Connected to database");
  })
  .catch((err)=>{
    console.log("Error connecting to database");
  })

}
dbConnection();
module.exports=dbConnection;

