const mongoose = require('mongoose');

const schema =  mongoose.Schema;


var cart  = new schema ({

    userid :{
        type :String,
        required : true,
    },
    items: [{
        bookid :{type :String, required:true},
        title :{type :String, required :true}
        ,language :{type :String, required :true}
        ,author :{type :String, required :true},
        price :{type :String, required :true}
        ,img :{type :String, required :true}
        ,booktype :{type :String, required :true}

    }]
    
  
    
})



module.exports = mongoose.model('mycart',cart);