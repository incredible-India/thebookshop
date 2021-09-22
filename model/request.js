const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var books  = new schema ({

    userid :{
        type :String,
        required : true,
    },
    

   bookrequest :[
       {
    title:{ type : String,}
    ,
    aurthor :{ type : String,}
    ,
    language :{ type : String,}
    ,
    booktype :{ type : String,}
    ,


    description :{ type : String}
,
    dateofreq :{ type : Date, default :  Date.now()}

    ,status :{ type : Boolean,default : false}
       }]
       
      , projectrequest : [
          {
            title:{ type : String}
         
            ,
            elements :{ type : String, }
            ,
   
        
        
            description :{ type : String}
        ,
            dateofreq :{ type : Date, default :  Date.now()}

          }
      ]

})



module.exports = mongoose.model('requestbook',books);