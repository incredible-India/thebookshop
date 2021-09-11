

document.getElementsByClassName('otpValidator')[0].addEventListener('submit',(e)=>{
    // e.preventDefault();
    let otp = document.getElementsByClassName('otp')[0].value
   
    if(otp.length == 0)
    {
        alert("Please Enter The Valid OTP")
        e.preventDefault()
        return;
       
    }
    
})


