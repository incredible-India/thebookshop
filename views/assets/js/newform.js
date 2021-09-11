(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();
  


    //fetching the json of indian cities and the states

    try{

        fetch('./../../public/src/json/states-and-districts.json')
        .then(data => data.json())
        .then(finalDATA =>{
            
 
            document.getElementsByClassName('statename')[0].innerHTML=""
            document.getElementsByClassName('statename')[0].innerHTML=" <option selected value=0 disabled> Select State </option> "
       
                for (i in finalDATA.states)
                {
                
                    document.getElementsByClassName('statename')[0].innerHTML +=
                      `
                      <option value="${finalDATA.states[i].state}">${finalDATA.states[i].state}</option>

                    `

                }
        })
        

    }catch
    {
        alert("sorry please try latar, we are facing server problem...")
    }

    //if user will not seect the state name

document.forms[1].onsubmit = (e)=>{


 
    if(document.getElementsByClassName('statename')[0].value == 0)
    {
   
        alert("Please Select state")
        e.preventDefault();
        e.stopPropagation();
       
        return;

    } if(document.getElementsByClassName('fname')[0].value.length < 3 )
    {
   
        alert("First name is too short...")
        e.preventDefault();
        e.stopPropagation();
       
        return;

    }
    
    
    if(document.getElementsByClassName('pass')[0].value !== document.getElementsByClassName('cnfpass')[0].value)
    {
        alert("password and confirm password does not match")
        e.preventDefault();
        e.stopPropagation();
       
        return;
    }if(document.getElementsByClassName('pass')[0].value.length < 5)
    {
        alert("password should be grater than 5 letters")
        e.preventDefault();
        e.stopPropagation();
       
        return;
    }
    
    
    if(document.getElementsByClassName('altphone')[0].value.length >0 )
    {
         if(document.getElementsByClassName('altphone')[0].value.length != 10)
         {
            alert("invalid alternate mobile number")
            e.preventDefault();
            e.stopPropagation();
         }
    }


}


document.getElementsByClassName('statename')[0].addEventListener('change',(e)=>{

    document.getElementsByClassName('cityname')[0].innerHTML=""
    


        try{

            fetch('./../../public/src/json/states-and-districts.json')
            .then(data => data.json())
            .then(finalDATA =>{
                
     
                
                // document.getElementsByClassName('statename')[0].innerHTML=" <option selected value=0 disabled> Select State </option> "
           
                    for (i in finalDATA.states)
                    
                    {

                        for(j in finalDATA.states[i].districts)
                        {
                            // console.log(finalDATA.states[i].districts[j]);


                            if(finalDATA.states[i].state == document.getElementsByClassName('statename')[0].value )
                            {
                            document.getElementsByClassName('cityname')[0].innerHTML +=
                              `
                              <option value="${finalDATA.states[i].districts[j]}">${finalDATA.states[i].districts[j]}</option>
        
                            `
                            }
                      
                             
                        }
                       
                    
    
                    }
            })
            
    
        }catch
        {
            alert("sorry please try latar, we are facing server problem...")
        }


    

})