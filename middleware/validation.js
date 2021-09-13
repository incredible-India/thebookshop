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




//now for the new registration form

function checkValidation(obj,mobileNumber)
{
    let datatobesaved = new Object;



    if(obj.fname == "")
    {
        return {err : 1 , msg : "First name cannot be empty"}
    }else if (obj.pass == "")
    {
        return {err : 1 , msg : "Enter the password.."}
    }else if(obj.pass.length < 5)
    {
        return {err : 1 , msg : "Password should be greater than 5"}
    }else if(obj.pass != obj.cnfpass)
    {
        return {err : 1 , msg : "Password and confirm password does not match.."}
    }else if(mobileNumber.length == 0 || mobileNumber.length < 10 )
    {
        return {err : 1 , msg : "please enter valid  mobile number.."}
    }
    else if(obj.state == "")
    {
        return {err : 1 , msg : "Please select your state"}
    }else if(obj.email.length <= 12)
    {
        return {err : 1 , msg : "Please Enter the valid email id"}
    }else
    {
            //well no need to write bellow`s code coz we can return directly obj  

            let againNmberCheck = checkExistance(mobileNumber);

            if(againNmberCheck)
            {
                console.log(againNmberCheck);

                return {err : 2}

            }else
            {
                for (i in obj)
                {
          
                    if(obj[i] == "")
                    {
                      //   obj[i] = null
                        datatobesaved[i] = null
                    }else
                    {
                      datatobesaved[i] = obj[i]
                    }
                }
                datatobesaved.err = 0;
           
               
                
                return datatobesaved;
            }

     
    }

}




module.exports = {checkNumber,checkExistance,checkValidation}