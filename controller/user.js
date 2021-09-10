const express = require('express')
const router = express.Router();//routing for urls
// const bodyParser = require('body-parser')
const path = require('path');
const validation = require('./../middleware/validation');


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
    res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,"errorCode" : 0,
    "varified" : 1})
    //errorCode is the paramenter passing in pug file for not showing the error after  entring the mobile number 
})





router.post('/verifyphone',async(req,res)=>{
    
    let isValidNumber = validation.checkNumber(req.body.mobile)

    res.setHeader('Content-Type' , "text/html");

    allNavOptions = {"All Tags" : "/" }

    if(isValidNumber)
    {
        

        let isExist = await validation.checkExistance(req.body.mobile)

       if(isExist)
       {
       
        return  res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,"errorCode" : 1,"errMSG" : "Mobile Number Already In used Please Try To Login ",
         "varified" : 1})
       }else
       {
        return  res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,"errorCode" : 0,
        "varified" : 0})
       }

      
    }

})







module.exports = router;