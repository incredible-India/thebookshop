const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var books  = new schema ({

    userid :{
        type :String,
        required : true,
    },
  links : { type : String, required : true}
,title : { type : String, required : true},
bookid : { type : String, required : true}
    
})



module.exports = mongoose.model('bookslink',books);