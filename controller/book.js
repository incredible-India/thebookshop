const express = require('express');
const {check ,validationResult} = require('express-validator')
const router = express.Router();//routing for urls
// const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload');
const path = require('path');


const jwt = require('jsonwebtoken');
const isAuth = require('./../authentication/userAuth'); 
const cookieParser = require('cookie-parser'); //cookies

router.use(express.static(path.join(__dirname + './../')))

// express().set('view engine', 'pug')
// express().set('views', './../views/pug/')

router.use(express.urlencoded({ extended: true }))//parsing data from url in json formate
router.use(fileUpload());//file upload middleware
router.use(cookieParser());//


router.get('/services',isAuth.authUser,async function(req,res){

    let isAuthentication = await req.isauth;

    let mynavBar = {'Home' : '/'}

    res.setHeader('Content-Type', 'text/html');

    if(isAuthentication)
    {

        return res.status(200).render('services',{navTexts : mynavBar,username : isAuthentication.fname});


    }else{
        
        return res.redirect('/newregistration/login')
    }

 
})


router.get('/bookupload',isAuth.authUser,async function(req, res){

    let isAuthentication = await req.isauth;

    let mynavBar = {'Home' : '/'}

    if(isAuthentication)
    {
        return res.status(200).render('sell',{navTexts : mynavBar,username : isAuthentication.fname})

    }else
    {
        return res.redirect('/newregistration/login')
    }
})


router.post('/verifydata',isAuth.authUser,[

    check('bname').not().isEmpty(),
    check('btype').not().isEmpty(),
    check('pyear').not().isEmpty(),
    check('language').not().isEmpty(),
    check('category').not().isEmpty(),
    check('price').not().isEmpty(),
    check('class').not().isEmpty(),

],async (req,res)=>{

    const errorFillingForm = validationResult(req);

    if(!errorFillingForm.isEmpty())
    {
        return res.send("Please try latar we are facing server issue..")
    }

  


})

module.exports = router;