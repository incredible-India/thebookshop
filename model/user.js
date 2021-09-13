const mongoose = require('mongoose');

var schema  = mongoose.Schema;


Newuser = new schema({

    fname : {
        type : String,
        required : true,
        min: [3, 'Too short name'],
    max: 12,
    unique:true,
    }
,
    lname : {
        type : String,
        
        min: [3, 'Too short name'],
    max: 12
    }

    ,
    email : {
        type : String,
        required :true,
        unique :true,
       
    },

    // comments: [{ body: String, date: Date ,bookid : String}],

    mobile : {

        type : Number,
        required :true,
        unique :true,
        

    },

    altmobile : {
        type : Number,
    }

    ,
    state :{
        type :String,
        required :true
    },
    
    
    city :{
        type :String,
        
    },
    

    password :{
        type : String,
        min: [3, 'Too short password'],
        required :true,


    }
    ,  img :{
        type : String,
        
               
    }
    ,
    dob :{
        type :Date
    }
    ,
    mkid :{
        type :Date,
        default : Date.now()
    }
    , gender : {
        type : String,
        required :true
    }

})




module.exports = mongoose.model('newuser',Newuser);