const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userprojects = new schema ({

   projectnumber : {
        type : Number,
        required : true,
        default : 0
    }
,

    
 
    userid :{
       type : String,
        required : true,
    }, 

    project :[
        {
        projectid :{
        type : String,
        required : true,
    
    },bookDate :{
        type : Date,
        default :Date.now() 
    }
}]
    
    
})

module.exports = mongoose.model('userprojects',userprojects)