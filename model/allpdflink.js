const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var pdfs  = new schema ({

    userid :{
        type :String,
        required : true,
    },
  links : { type : String, required : true}
,title : { type : String, required : true},
pdfid : { type : String, required : true}
    
})



module.exports = mongoose.model('pdfslink',pdfs);