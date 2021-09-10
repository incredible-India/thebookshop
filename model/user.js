const mongoose = require('mongoose');

var schema  = mongoose.Schema;


Newuser = new schema({

    fname : {
        type : String,
        required : true,
        min: [3, 'Too short name'],
    max: 12
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

    comments: [{ body: String, date: Date ,bookid : String}],

    mobile : {

        type : Number,
        required :true,
        

    },

    ultmobile : {
        type : Number,
    }

    ,
    address :{
        type :String
    },

    password :{
        type : String,
        min: [3, 'Too short password'],
        required :true,


    }
    ,  img :{
        data : Buffer,
        ContentType : String
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

})




module.exports = mongoose.model('newuser',Newuser);