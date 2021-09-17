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
  



    
    document.forms[1].onsubmit = (e)=>{

        if(document.getElementsByClassName('link')[0].value.length < 10)
        {
       
            alert("Please Upload valid link")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
 
        if(document.getElementsByClassName('link')[0].value == "")
        {
       
            alert("Please Upload valid link")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        } if(document.getElementsByClassName('pname')[0].value.length < 3 )
        {
       
            alert("Project  name is too short...")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
   
        
        if(document.getElementsByClassName('element')[0].value == "" )
        {
       
            alert("please mention the project elements")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
   
        
  
        
     

    

    }
    