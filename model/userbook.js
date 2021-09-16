const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userbook = new schema ({

    booknumber : {
        type : Number,
        required : true,
        default : 0
    }
,

 
    userid :{
       type : String,
        required : true,
    }, 

    books :[
        {
        bookid :{
        type : String,
        required : true,
    
    },bookDate :{
        type : Date,
        default :Date.now() 
    },  
      bookstatus :{ type : Boolean, required : true}
}]
    
    
})



module.exports = mongoose.model('userbook',userbook);