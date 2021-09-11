

document.getElementsByClassName('validatemob')[0].addEventListener('submit',(e)=>{
    // e.preventDefault();
    let mob = document.getElementsByClassName('mobn')[0].value
   
    if(mob.length != 10)
    {
        alert("Invalid Mobile number..")
        e.preventDefault()
        return;
       
    }
    
})


