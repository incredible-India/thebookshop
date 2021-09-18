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
  

    let language = ["Assamese", 'Bengali', 'Bodo', 'Dogri', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Marathi', 'Meitei', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Urdu', 'Other' ]

    //inserting language 

    document.getElementsByClassName('language')[0].innerHTML = "";
    document.getElementsByClassName('language')[0].innerHTML = `<option disabled selected value=0>Select Language </option>`;

    for(i in language)
    {
        document.getElementsByClassName('language')[0].innerHTML +=`<option value=${language[i]}>${language[i]}</option>` 
    }

    
    document.forms[1].onsubmit = (e)=>{

      
 
        if(document.getElementsByClassName('pname')[0].value.length < 3 )
        {
       
            alert("Please write the valid pdf name")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
   
        
       
   
        if(document.getElementsByClassName('pimg')[0].value == "")
        {
       
            alert("Please Upload The PDF")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
   
        
       if(document.getElementsByClassName('language')[0].value == 0)
       {
        alert("PleaseSelect The Language")
        e.preventDefault();
        e.stopPropagation();
       
        return;
       }
   
  
        
     

    

    }
    