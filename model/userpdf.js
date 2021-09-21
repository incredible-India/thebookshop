const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userpdf = new schema ({

   pdfnumber : {
        type : Number,
        required : true,
        default : 0
    }

    ,
 
    userid :{
       type : String,
        required : true,
    }, 

    pdf :[
        {
        pdfid :{
        type : String,
        required : true,
    
    },pdfDate :{
        type : Date,
        default :Date.now() 
    },
    download :{ type : Number, required : true, default : 0}
}]
    
    
})

module.exports = mongoose.model('userpdf',userpdf);