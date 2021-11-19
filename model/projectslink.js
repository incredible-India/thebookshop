const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var projects  = new schema ({

    userid :{
        type :String,
        required : true,
    },
  links : { type : String, required : true}
,title : { type : String, required : true},
projectid : { type : String, required : true}
    
})



module.exports = mongoose.model('pojectlinks',projects);