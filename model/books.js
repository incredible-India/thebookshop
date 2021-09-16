const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var books  = new schema ({

    userid :{
        type :ObjectID,
        required : true,
    },
    title:{ type : String, required : true}
    ,
    aurther :{ type : String,}
    ,
    language :{ type : String, required : true}
    ,
    booktype :{ type : String, required : true}
    ,
    year :{ type : String, required : true}
    ,
    catagory :{ type : String, required : true}
    ,
    description :{ type : String}

    ,price :{ type : Number, required : true}

    ,img :[{ type : String,}]

})



module.exports = mongoose.model('books',books);