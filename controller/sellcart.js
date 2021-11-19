/* in this page all the routing related with buy ,cart, comments manged*/
const express = require('express')
const router = express.Router()
const allBookInDB = require('./../model/books');//all the book on this side are kept in this 
const {base64encode,base64decode} =require('nodejs-base64')






router.get('/:bookid', async (req, res) => {

    try {

        let bookID = base64decode(req.params.bookid);

        let verifyDataInDB = await allBookInDB.findOne({_id : bookID})

        res.json(verifyDataInDB)
        
    } catch (error) {
        
        console.log("Oppps... try latar in /:bookid sellcart.js");

    }

   
})










module.exports =  router;