var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://achraf:achraf@cluster0-1yqgu.mongodb.net/test?retryWrites=true',{useNewUrlParser:true},(err)=>{
       if(!err) {console.log("mongoDB connection succeeded")}
       else {console.log("error "+err)}
   });
