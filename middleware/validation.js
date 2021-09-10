// mobile number validation 

const USERDBS = require('./../model/user');

function checkNumber(numberMobile)
{
    if(numberMobile.length == 10)
    {
        return 1
    }else
    return null;
}



function checkExistance(inputNumber)
{
 


   let tobeVarified =   USERDBS.findOne({mobile : inputNumber})
   .catch(error =>{
       console.log("Error Code BSDB 003");
   })

   return tobeVarified;
}









module.exports = {checkNumber,checkExistance}