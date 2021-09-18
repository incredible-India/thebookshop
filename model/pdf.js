const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var pdf  = new schema ({

    userid :{
        type :String,
        required : true,
    },
    title:{ type : String, required : true}
    ,

    
    auth :{ type : String}
    ,

    language:{ type : String, required : true}
    ,

    
    description :{ type : String}



    ,img :{ type : String, required : true}

})



module.exports = mongoose.model('pdf',pdf);