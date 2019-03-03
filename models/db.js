var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PIW',{useNewUrlParser:true},(err)=>{
       if(!err) {console.log("mongoDB connection succeeded")}
       else {console.log("error "+err)}
   });
