//require dotenv file 
require('dotenv').config();

const mongoose = require('mongoose');//database mongodb
const chalk = require('chalk');
//mongodb url 
const DBport = process.env.DATABASEURL;

//connection code 

mongoose.connect(DBport,{
    useNewUrlParser: true,

    useUnifiedTopology: true


}).then(res =>{
    console.log(chalk.bold.blue.bgYellowBright('Database connected Successfully..'))
}).catch(err =>{
    console.log(chalk.bold.bgBlack.red("Database connection failed..Error Code BSDB 01",err));
})