const express = require('express');
const {check ,validationResult} = require('express-validator')
const router = express.Router();//routing for urls
// const bodyParser = require('body-parser')
const bcryptjs = require('bcryptjs');
const fileUpload = require('express-fileupload');
const path = require('path');
const validation = require('./../middleware/validation');
const user = require('./../model/user');
const jwt = require('jsonwebtoken');
const isAuth = require('./../authentication/userAuth'); 
const cookieParser = require('cookie-parser'); //cookies

router.use(express.static(path.join(__dirname + './../')))

// express().set('view engine', 'pug')
// express().set('views', './../views/pug/')

router.use(express.urlencoded({ extended: true }))//parsing data from url in json formate
router.use(fileUpload());//file upload middleware
router.use(cookieParser());//


// var urlHash = require('url-hash');
 
// var url = 'http://www.example.com/page?id=4';
 
// // add hash to url
// var newUrl = urlHash.create(url);

// console.log(newUrl);
var mobileNumber ;//a global variable to store mobile number

//new registration will be here mobile number will be asked
router.get('/',(req,res)=>{
   
    //this is option in navbar of user icon
    allNavOptions = {"All Tags" : "/" }

    res.setHeader("Content-Type",'text/html'); //response type
    res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,"errorCode" : 0,
    "varified" : 1,username :"User"})
    //errorCode is the paramenter passing in pug file for not showing the error after  entring the mobile number 
})


//for the otp varification we will send in this route


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
         "varified" : 1,username :"User"})
       }else
       {
           mobileNumber = req.body.mobile;
        return  res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :allNavOptions ,"errorCode" : 0,
        "varified" : 0,username :"User"})
        
       }

      
    }

})



//after entering the otp ,we will varyfy that otp in this router

router.post('/verificationSuccess',(req,res)=>{

    let mynavBar = {"my cart" : "/","your order" : "#","log in" : "/"}
   

    res.setHeader('Content-Type',"text/html");
    // return  res.status(200).render('otpPmobile',{"name": "Himanshu", navTexts :mynavBar ,"errorCode" : 0,
    // "varified" : 0})
    res.status(200).render('newRegistrationForm',{"name": "Himanshu", navTexts :mynavBar,mobilenumber: mobileNumber,username :"User"})

})


//after felling the registration we will check the form 

router.post('/checking/redirecting',[

    check('fname').not().isEmpty().trim(),
    check('email').isEmail().trim(),
    check('state').not().isEmpty(),
    check('pass').not().isEmpty().trim(),
    check('gender').not().isEmpty()
  
  
    


],async (req,res)=>{

    //checking the registration form..
    //first express validator will check the information
    let mynavbar = {"homepage":"/"}
    // todo file image worlk only
    const formError = validationResult(req);


    res.setHeader("Content-Type","text/html");

    if(!formError.isEmpty())
    {
       return res.status(403).send(`<h1> Error Code BSDB 004 ${formError.errors[0].param}`)
    }

    //now again check all the validations 
    var mydata = validation.checkValidation(req.body,mobileNumber)
//mydata will return err =0 or 1 if 0 mean no error redirect the home page after saving in dbs if 1 mean there is error
    if(mydata.err == 1) //if any error in form
    {
        return res.redirect('/newregistration')
    //  return  res.status(403).render('newRegistrationForm',{navTexts : mynavbar,err : mydata.err, msg : mydata.msg,k:1,mdata : mydata,mobilen : mobileNumber})

    }else
    {
      

        if(req.files)
        {
             filename = `${req.files.userimg.md5}_${req.files.userimg.name}`;


            req.files.userimg.mv(path.join(__dirname,"./../public/src/userimage/") + filename,(err)=>{
                if(err)
                {
                    return res.status(403).send(`<h1> ERROR BSDB 006  ${err} </h1>`);
                }
            })

        }else
        {
            filename = null;
        }
  
     //now time to save all the information database 
  

     //again we will check mobie number...

     let checkAgain =await  user.findOne({mobile : mobileNumber})
    //   console.log(checkAgain);
     if(checkAgain)
     {
         //if mobile number already exist we will send this
         return res.status(200).send("<h1> YOU ARE ALREADY MEMBER PLEASE VISIT TO LOGIN PAGE</h1>")
     }
   
     //all information are available in mydata and filename and mobileNumber
     let USER = new user({
         fname : mydata.fname,
         lname : mydata.lname,
         email : mydata.email,
         gender : mydata.gender,
         state : mydata.state,
         city : mydata.city,
         password :bcryptjs.hashSync(mydata.pass,10),
         mobile : mobileNumber,
         altmobile : mydata.altmobile,
         zip : mydata.zip,
         img : filename,
         dob:mydata.dob,



     })

     const token  =  USER.genrateTOKEN();


    

     res.cookie('jwt', token, { expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)) }); // generated token we will save in cookie and varify this latar when user will login


    return  res.status(200).redirect('/');
     
    }
    
})

//again make object clearly to pass for response


//login optional 

router.get('/login', (req,res) => {

    mynavBar = {"Home" : '/',"Sign in" : "/newregistration"}

    res.setHeader('Content-Type', 'text/html');

    res.render('login',{"name": "Himanshu", navTexts :mynavBar,err : 0,username :"User"})

})

//login page 

router.post('/userauth/tokensave',[
    check('mobile').not().isEmpty(),
    check('password').not().isEmpty()
],async  (req,res) => {

    mynavBar = {"Home" : '/',"Sign in" : "/newregistration"}

    const errorLOGIN = validationResult(req);

    res.setHeader("Content-Type","text/html");

    if(!errorLOGIN.isEmpty())
    {
       return res.status(403).send(`<h1> Error Code BSDB 004 ${formError.errors[0].param}`)
    }


    if(req.body.mobile.length != 10){

        return res.status(403).render('login',{navTexts :mynavBar , err : 1})
    }

    let checkUserInfo = await  user.findOne({mobile : req.body.mobile});


    if(checkUserInfo)
    {
        let matchPassword = bcryptjs.compareSync(req.body.password, checkUserInfo.password)
        
       if(matchPassword)
       {
        


        const token  =  checkUserInfo.genrateTOKEN();

        res.cookie('jwt', token, { expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)) });

        return  res.status(200).redirect('/');

       }else
       {
        return res.status(403).render('login',{navTexts :mynavBar , err : 1})
       }

    }else
    {
        return res.status(403).render('login',{navTexts :mynavBar , err : 1})
    }


})


// logout the user

router.get('/logout', isAuth.authUser,async function(req, res){

    let UserAuth = await req.isauth;  //it will return either document of user or null

    if (UserAuth) {

        // console.log(UserAuth);
        UserAuth.tokenSchema = []; //this logout from all devices and make token emapty in dbs
        res.clearCookie('jwt');  //clear the cookies
        UserAuth.save(); //save changes the data in dbs
        return res.redirect('/'); //redirect the home page

    } else {
        res.clearCookie('jwt');
        return res.redirect('/');

    }

})

//myaccount the

router.get('/myaccount',isAuth.authUser,async(req,res)=>{

    let isAuthentication = await req.isauth;

    let navbar = {"my cart" : "/","your order" : "#","log in" : "/"}

    res.setHeader('Content-Type', 'text/html');

    if(isAuthentication)
    {
        return res.render('account',{name  : "Himanshu" ,navTexts : navbar, username : isAuthentication.fname,userinfo : isAuthentication})

    }else
    {
      return  res.redirect('/newregistration/login');
    }

})




module.exports = router;