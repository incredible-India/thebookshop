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



    let category = ['Management MBA/BBA','Engineering B.Tech and B.Arch, M.Tech, ME, BE','Computer Application-BCA/MCA',
'Designing - Fashion/Interior/Web','Mass-communication/Journalism BJMC','Hospitality (Hotel) - Hotel Management','Medical-BDS and MBBS','Finance -B.Com/CA','Arts Psychology and Sociology','Law B.ALLB/LLB','Education Teaching-B.Ed/M.Ed','Pharmacy B.Pharma/M.Pharma','Tourism management - B.Sc.','Fine Arts B.F.A','Nursing B.Sc. and M.Sc. in Nursing','B.A','BSc','Other']

document.getElementsByClassName(' category')[0].innerHTML = "";
document.getElementsByClassName('category')[0].innerHTML = `<option disabled selected value=0>Select Category </option>`;

for(i in category)
{
    document.getElementsByClassName('category')[0].innerHTML +=`<option value=${category[i]}>${category[i]}</option>` 
}


let classNameis = ["kids",'1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','Above']

document.getElementsByClassName('class')[0].innerHTML = "";
document.getElementsByClassName('class')[0].innerHTML = `<option disabled selected value=0>Select Class </option>`;

for(i in classNameis) 
{
    document.getElementsByClassName('class')[0].innerHTML +=`<option value=${classNameis[i]}>${classNameis[i]}</option>` 
}

    document.forms[1].onsubmit = (e)=>{


 
        if(document.getElementsByClassName('category')[0].value == 0)
        {
       
            alert("Please Select category")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        } if(document.getElementsByClassName('bname')[0].value.length < 3 )
        {
       
            alert("Book  name is too short...")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
        if(document.getElementsByClassName('btype')[0].value == 0)
        {
       
            alert("Please Select Book Type")
            e.preventDefault();
            e.stopPropagation();
           
            return;
    
        }
        
        
        if(document.getElementsByClassName('price')[0].value < 0 || document.getElementsByClassName('price')[0].value =="")
        {
            alert("Please enter the price ,write 0 if book is free for sale..")
            e.preventDefault();
            e.stopPropagation();
           
            return;
        }if(document.getElementsByClassName('language')[0].value == 0)
        {
            alert("Please selct the book language")
            e.preventDefault();
            e.stopPropagation();
           
            return;
        }
        
        
        if(document.getElementsByClassName('class')[0].value == 0 )
        {
           
                alert("please select the class..")
                e.preventDefault();
                e.stopPropagation();
             
        }
        if(document.getElementsByClassName('bookimg')[0].value == "" )
        {
            
             
                alert("Upload Book Images..")
                e.preventDefault();
                e.stopPropagation();
             
        }
    

    }
    