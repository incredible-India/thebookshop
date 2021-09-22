//Himanshu Sharma 08/09/2020
//requiring all packages
//dot env file
require('dotenv').config();
const express =require('express'); //express template engine
const cors = require('cors');//for cors error
const morgan = require('morgan');//morgan for debugging
const chalk  = require('chalk'); //beautify the console window
const pug = require('pug'); //for the templates in views
const path = require('path');//path built in module
const userRoute = require('./controller/user');
const bookRoute = require('./controller/book');
//database connection code...
require('./db/dbConnection');
const cookieParser = require('cookie-parser'); //cookies
const isAuth = require('./authentication/userAuth');//web authentication and password 



//initilise the express
const app = express();


//declare the port number 

const __port = process.env.PORT || 80;

//using middlewere
app.use('/newregistration',userRoute);//user routes
app.use('/bookshop',bookRoute);//books route
app.set('view engine', 'pug');
app.set('views','./views/pug');//set up the template engine
app.use(express.static(path.join(__dirname, './'))); //for the static files
app.use(morgan('dev'));//morgan
app.use(cors());//cors error
app.use(cookieParser());//cookies parser middleware

//routing code....

//home page

app.get('/',isAuth.authUser,async (req,res)=>{

    

   let isauth = await req.isauth; 

   if(isauth)
   {
      return res.status(200).render('index',{name : "hello",navTexts : {"Notifications (5)" : '/mynotifications',"Requests" : "/bookshop/request","Services" : "/bookshop/services","logout" : '/newregistration/logout',"My Account" : "/newregistration/myaccount"},username : isauth.fname});
   }else
   {
      return  res.status(200).render('index',{name : "hello",navTexts : {"Sign in" : "/newregistration","Action" : "#","Hello World" : "#" ,"login" : '/newregistration/login',},username : "User"});
   }


    
    
})



//listening the port
try {
    app.listen(__port,()=>{
        console.log(chalk.bgYellowBright.greenBright("Server is running at port ", __port));
    })
} catch (error) {
    console.log(chalk.bgBlackBright.redBright("ERROR : BSPT 01"))
}
