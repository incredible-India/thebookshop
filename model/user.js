const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var schema  = mongoose.Schema;
require('dotenv').config();

Newuser = new schema({

    fname : {
        type : String,
        required : true,
        min: [3, 'Too short name'],
    max: 12,

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
     
       
    },

 
    

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
    }, 
    tokenSchema : [{tokendbs:{
        type:String,
        required:true
    }}]
})


Newuser.methods.genrateTOKEN= function()
{
    const tokenGenrate = jwt.sign({_id : this._id}, process.env.SECRET_KEY);//this will generate a token

    //now save in database this token 
 
    this.tokenSchema = this.tokenSchema.concat( {tokendbs : tokenGenrate} );
 
 
    this.save()
    .catch(err=>{
        console.log(err,"check the error in modal userJS");
    })

    
    return tokenGenrate;
 
}



module.exports = mongoose.model('newuser',Newuser);