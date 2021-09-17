const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var projects  = new schema ({

    userid :{
        type :String,
        required : true,
    },
    title:{ type : String, required : true}
    ,

    
    elements :{ type : String, required : true}
    ,

    link:{ type : String, required : true}
    ,

    
    description :{ type : String}



    ,img :{ type : String,}

})



module.exports = mongoose.model('projects',projects);