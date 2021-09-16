const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userbook = new schema ({

    booknumber : {
        type : Number,
        required : true,
    }
,
    projectnumber :{
        type : Number,
        required : true,
    }
,
    pdfnumber : {
        type : Number,
        required : true,
    }
    ,userid :{
        type : ObjectId,
        required : true,
    }, 

    books :[{bookid :{
        type : ObjectId,
        required : true,
    
    },bookDate :{
        type : Date,
        default :Date.now() 
    }}]
    ,
    

    projects :[{projectid :{
        type : ObjectId,
        required : true,
    
    },projectDate :{
        type : Date,
        default :Date.now() 
    }}],
    

    pdfs :[{pdfid :{
        type : ObjectId,
        required : true,
    
    },pdfDate :{
        type : Date,
        default :Date.now() ,
        
    },  satus :{
        type : Boolean,
        required : true,
    }}]
    ,
  

})



module.exports = mongoose.model('userbook',userbook);