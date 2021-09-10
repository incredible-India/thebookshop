const express = require('express')
const router = express.Router();//routing for urls

const path = require('path');


express().set('view engine', 'pug')
express().set('views', './../All templates/')
router.use(express.urlencoded({ extended: true }))//parsing data from url in json formate

router.use(express.static(path.join(__dirname + './../')))

// var urlHash = require('url-hash');
 
// var url = 'http://www.example.com/page?id=4';
 
// // add hash to url
// var newUrl = urlHash.create(url);

// console.log(newUrl);

router.get('/',(req,res)=>{
   
    //this is option in navbar of user icon
    allNavOptions = {"All Tags" : "/" }

    res.setHeader("Content-Type",'text/html'); //response type
    res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,errorCode : 0},)
    //errorCode is the paramenter passing in pug file for not showing the error after  entring the mobile number 
})












module.exports = router;