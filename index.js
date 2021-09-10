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
//database connection code...
require('./db/dbConnection');



//initilise the express
const app = express();


//declare the port number 

const __port = process.env.PORT || 80;

//using middlewere
app.use('/newregistration',userRoute)
app.set('view engine', 'pug');
app.set('views','./views/pug');//set up the template engine
app.use(express.static(path.join(__dirname, './'))); //for the static files
app.use(morgan('dev'));//morgan
app.use(cors());//cors error


//routing code....

//home page

app.get('/',(req,res)=>{

    let navBarOPT = {"Sign in" : "/newregistration","Action" : "#","Hello World" : "#" }
    
    res.render('index',{name : "hello",navTexts : navBarOPT});
})



//listening the port
try {
    app.listen(__port,()=>{
        console.log(chalk.bgYellowBright.greenBright("Server is running at port ", __port));
    })
} catch (error) {
    console.log(chalk.bgBlackBright.redBright("ERROR : BSPT 01"))
}
