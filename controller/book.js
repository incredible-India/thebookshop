require('dotenv').config();
const express = require('express');
const {check ,validationResult} = require('express-validator')
const router = express.Router();//routing for urls
// const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload');
const path = require('path');


const jwt = require('jsonwebtoken');
const isAuth = require('./../authentication/userAuth'); 
const cookieParser = require('cookie-parser'); //cookies
const validateData = require('./../middleware/validation');
const userbook = require('./../model/userbook');
const books = require('./../model/books');
const userproject = require('./../model/userproject');
const project = require('./../model/projects');
const userpdf = require('./../model/userpdf');
const pdf = require('./../model/pdf');
const {base64encode, base64decode} = require('nodejs-base64');//for encoding and the decoding the data
const myrequest = require('./../model/request');
router.use(express.static(path.join(__dirname + './../')))



router.use(express.urlencoded({ extended: true }))//parsing data from url in json formate
router.use(fileUpload());//file upload middleware
router.use(cookieParser());//


router.get('/services',isAuth.authUser,async function(req,res){

    let isAuthentication = await req.isauth;

    let mynavBar = {'Home' : '/'}

    res.setHeader('Content-Type', 'text/html');

    if(isAuthentication)
    {

        //first we will check the existanse of the collections
        let booksinformation = await books.find({userid : isAuthentication._id});
        let pdfinformation = await pdf.find({userid : isAuthentication._id});
        let projectinformation = await project.find({userid : isAuthentication._id});

        //for the books information
        if(booksinformation.length)
        {
            let localbook = await userbook.findOne({userid : isAuthentication._id});

            if(localbook)
            {
                booklist = new Array;
                numberbook = localbook.booknumber;

              
                for(i in booksinformation)
                {
                    booklist = booklist.concat({bookid : base64encode(booksinformation[i].id),title : booksinformation[i].title})
                }
              

                mybook = {nodata :false ,numberofbooks : numberbook,lists : booklist}
            }else
            {
                return res.status(404).send("Server issue....Error Code BSDB 010")
            }

        }else
        {
           mybook = {nodata : true} // pass an object with not available...
        }

        //now for the pdf ....................
        if(pdfinformation.length)
        {
            let localpdf = await userpdf.findOne({userid : isAuthentication._id});

            if(localpdf)
            {
                pdflist = new Array;
                numberpdf = localpdf.pdfnumber;
           
                for(i in pdfinformation)
                {
                  
                    pdflist = pdflist.concat({pdfid : base64encode(pdfinformation[i].id),title : pdfinformation[i].title})
                }
              

                mypdf = {nodata :false , numberofpdf : numberpdf,lists : pdflist}
            }else
            {
                return res.status(404).send("Server issue....Error Code BSDB 011")
            }

        }else
        {
           mypdf = {nodata : true} // pass an object with not available...
        }

        //project data.............................
        if(projectinformation.length)
        {
            let localproject = await userproject.findOne({userid : isAuthentication._id});

            if(localproject)
            {
                projectlist = new Array;
                numberproject = localproject.projectnumber;
           
                for(i in projectinformation)
                {
                    projectlist = projectlist.concat({projectid : base64encode(projectinformation[i].id), title : projectinformation[i].title})
                }
              

                myproject = {nodata :false , numberofproject : numberproject,lists : projectlist}
            }else
            {
                return res.status(404).send("Server issue....Error Code BSDB 012")
            }

        }else
        {
           myproject = {nodata : true} // pass an object with not available...
        }


        /////////////////////////////////////////////////////
        // console.log(mybook);
        // console.log(mypdf);
        // console.log(myproject);
        //now we will pass these informations in services..
        return res.status(200).render('services',{navTexts : mynavBar,username : isAuthentication.fname,bookinfo : mybook,pdfinfo : mypdf,projectinfo : myproject});


    }else{
        
        return res.redirect('/newregistration/login')
    }

 
})


router.get('/bookupload',isAuth.authUser,async function(req, res){

    let isAuthentication = await req.isauth;

    let mynavBar = {'Home' : '/'}

    if(isAuthentication)
    {
        return res.status(200).render('sell',{navTexts : mynavBar,username : isAuthentication.fname})

    }else
    {
        return res.redirect('/newregistration/login')
    }
})


router.post('/verifydata',isAuth.authUser,[

    check('bname').not().isEmpty(),
    check('btype').not().isEmpty(),
    check('pyear').not().isEmpty(),
    check('language').not().isEmpty(),
    check('category').not().isEmpty(),
    check('price').not().isEmpty(),
    check('class').not().isEmpty(),

],async (req,res)=>{

    let isAuthentication =await  req.isauth;

    let mynavBar = {'Home' : '/'}

    let filename = new Array;

    const errorFillingForm = validationResult(req);

    if(!errorFillingForm.isEmpty())
    {
        return res.send("Please try latar we are facing server issue..Error Code BSDB 007")
    }

    if(isAuthentication)
    {

    

  const checkAgainForm = validateData.books_Information_errorCheck(req.body,req.files);

    if(checkAgainForm.err){

        return res.status(403).render("sell",{navTexts : mynavBar, username : isAuthentication.fname,err : 1, msg : checkAgainForm.message})

    }else
    {
  
        //for the images of the book will be
        if(req.files)
        {
            //we writing this beacuse req.files return array if image is uploaded more than 1 and it returns only object image is uploaded only one 
        
           if(req.files.bookimg.length === undefined)
           {

            filename = `${req.files.bookimg.md5}_${req.files.bookimg.name}`;
 
 
            req.files.bookimg.mv(path.join(__dirname,"./../public/src/bookimage/") + filename,(err)=>{
                if(err)
                {
                    return res.status(403).send(`<h1> ERROR BSDB 006  ${err} </h1>`);
                }
            })


           }else
           {
            for(i=0;i<req.files.bookimg.length;i++)
            {
           
             filename[i] = `${req.files.bookimg[i].md5}_${req.files.bookimg[i].name}`;
 
 
             req.files.bookimg[i].mv(path.join(__dirname,"./../public/src/bookimage/") + filename,(err)=>{
                 if(err)
                 {
                     console.log(err)
                     return res.status(403).send(`<h1> ERROR BSDB 006  ${err} </h1>`);
                 }
             })
            }
           }

        }else
        {
            return res.status(403).render("sell",{navTexts : mynavBar, username : isAuthentication.fname,err : 1, msg : "Please upload images of book (max 5 images..)"})
        }

        //saving in the all books database
    
         new books({

            userid : isAuthentication._id,
            title : checkAgainForm.bname,
            aurthor : checkAgainForm.bauth,
            language : checkAgainForm.language,
            booktype : checkAgainForm.btype,
            year : checkAgainForm.pyear,
            category : checkAgainForm.category,
            description :checkAgainForm.dis
            ,price : checkAgainForm.price,
            class : checkAgainForm.class,
            bookfor : checkAgainForm.bookfor,
            img : filename


        })//we are sving this inside the save function beacuse first we need to save allboks dbs then userbook dbs and we nee allbook id for saving in the dbs
        .save(async (err,data)=>{
            if(err) 
            {
                console.log(err);
            }else
            {
                // let nbooks;
                let number_of_books = await userbook.findOne({userid : isAuthentication._id});
            
     

                
                if(number_of_books)
                {
                    let bookslist = number_of_books.books.concat({bookid : data._id,bookstatus :false})

                    userbook.findOneAndUpdate({userid : isAuthentication._id},{books : bookslist,booknumber : ++number_of_books.booknumber},(err,data)=>{
                        if(err)
                        {
                            console.log(err,"saving in existing books database in userbook");
                        }
                    })
                   
                

                }else
                {
                    new userbook({
            
                        booknumber : 1,
                        userid : isAuthentication._id,
                        books : [
                            {bookid : data._id
                            ,bookstatus : false}
                        ] 
                
                    })
                .save()
                .catch(error=>{
                   console.log(error);
                })
                }
           
            }
        })
      
//now time for the saving the files in the user database 
    //  for the book number we need to find booknumber from its database 
    //extracting book id from the previous database allbooks 
  
 
  

        return res.redirect('/bookshop/services'); //if everything will be ok then 

    }
}else{
    return res.redirect('/newregistration/login')
}


})


//for the uploading the project we will provide only links 

router.get('/upload/project',isAuth.authUser, async (req, res)=>{
    let mynavBar =   {'Home' : '/'}

    let isAuthentication = await req.isauth;

    res.setHeader('Content-Type', 'text/html');

    if(isAuthentication)
    {
       return res.status(200).render('project',{navTexts : mynavBar, username : isAuthentication.fname})

    }else
    {
        return res.redirect('/newregistration/login')
    }


})


//after projects we will verify the data and save in the database
router.post('/projects/verifydata',isAuth.authUser,[
    check('pname').not().isEmpty(),
    check('link').not().isEmpty(),
    check('element').not().isEmpty()

],async (req, res)=>{


    let isAuthentication = await req.isauth;

    res.setHeader('Content-Type', 'text/html');

    let projectError =  validationResult(req);

    if(!projectError.isEmpty())
    {
        return res.status(401).send("Server issues...Error Code BSDB 008")
        
    }

    if(isAuthentication)
    {

        
        let mydata = validateData.checkProjectInformation(req.body);

        if(mydata.err)
        {
            return res.status(403).render('project',{navTexts : {'home':"/"}, username : isAuthentication.fname,err :mydata.err,msg : mydata.message})
        }

        if(req.files)
        {
             filename = `${req.files.projectimg.md5}_${req.files.projectimg.name}`;


            req.files.projectimg.mv(path.join(__dirname,"./../public/src/projectimage/") + filename,(err)=>{
                if(err)
                {
                    return res.status(403).send(`<h1> ERROR BSDB 006/008  ${err} </h1>`);
                }
            })

        }else
        {
            filename = null;
        }
  

        // now save this in the project schema  

        new project({

            userid : isAuthentication._id,
            title : mydata.pname,
            elements : mydata.element,
            link : mydata.link,
            description : mydata.pdis,
            img : filename
            
        }).save(
           async (err,data)=>{
                if(err){
                    console.log("error in saving the project",err);
                    return;
                }else
                {
                    let existRepo = await userproject.findOne({userid : isAuthentication._id})

                    if(existRepo)
                    {
                        projectlist = existRepo.project.concat({projectid : data._id})
                        userproject.findOneAndUpdate({userid : isAuthentication._id},{
                            projectnumber : ++existRepo.projectnumber,
                            project : projectlist
                            
                        },(err,data)=>{
                            if(err){
                                console.log("error in upadating",err);
                            }
                        })

                    }else
                    {
                        new userproject({
                            userid : data.userid,
                            projectnumber : 1, 
                            project : [
                               { projectid : data._id,

                               }]




                        }).save((err,data)=>{
                            if(err){{
                                console.log(err,"saving in the userproject schema");
                            }}
                        })
                    }
                }
            }
        )

          
        return res.redirect('/bookshop/services');//now send some information like page service page
          

    }else
    {
        return res.redirect('/newregistration/login')

    }


})

//roting for the uploading the pdf and the files 

router.get('/upload/pdf',isAuth.authUser,async (req,res)=>{

    isAuthentication = await req.isauth; 

    res.setHeader('Content-Type', 'text/html');

    if(isAuthentication)
    {

        return res.status(200).render('pdf',{username : isAuthentication.fname,navTexts : {"Home" : "/"},err:0})

    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }




}
)

router.post('/pdf/verifydata',isAuth.authUser,[
    check('pname').not().isEmpty(),
    check('language').not().isEmpty()

],async (req, res)=>{
     
    let pdfValidationError = validationResult(req);

    if(!pdfValidationError.isEmpty())
    {
        return res.send('server Issue....Error Code BSDB 009')
    }

    let mydata = validateData.pdfValidator(req.body)

    //fisrst check the authentication token

    let isAuthentication = await req.isauth; 

    if(isAuthentication)
    {
        //now check the form error message

        if(mydata.err)
        {
            return res.status(200).render('pdf',{username : isAuthentication.fname,navTexts : {"Home" : "/"},err:mydata.err,msg : mydata.message})
        }
        //now check for the pdf upload
        if(req.files)
        {
             filename = `${req.files.pdfimg.md5}_${req.files.pdfimg.name}`;


            req.files.pdfimg.mv(path.join(__dirname,"./../public/src/allpdfs/") + filename,(err)=>{
                if(err)
                {
                    return res.status(403).send(`<h1> ERROR BSDB 006/009  ${err} </h1>`);
                }
            })

        }else
        {
            
          return  res.status(403).render('pdf',{username : isAuthentication.fname,navTexts : {"Home" : "/"},err : 1,msg : "Please Upload the pdf"})
        }


        new pdf({
            userid : isAuthentication._id,
            title : mydata.pname,
            auth : mydata.aname,
            language : mydata.language,

            description : mydata.pdis,
            img : filename
        }).save(async (err,data)=>{
            if(err)
            {
                console.log(err,"saving pdf schema");
                return ;
            }

            let exisipdf = await userpdf.findOne({userid : isAuthentication._id})        

            if(exisipdf)
            {
                pdflist = exisipdf.pdf.concat({pdfid : data._id})

                userpdf.findOneAndUpdate({userid : isAuthentication._id},{pdfnumber : ++exisipdf.pdfnumber,pdf : pdflist},(err,data)=>{
                    if(err)
                    {
                        console.log("error in userpdf updatinf ",err);
                        return;
                    }
                })

            }else
            {
                new userpdf({
                    pdfnumber : 1, 
                    userid : data.userid,
                    pdf : [
                        { pdfid : data._id}
                    ]
                }).save((err,data)=>{
                    if(err)
                    {
                        console.log(err,'saving in the user pdf schema');
                        return;
                    }
                })
            }
        })

     
        return res.redirect('/bookshop/services');

    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }
})

//time for show the list of books/pdf/projects 

router.get('/mybooks/:typeofcon/:number',isAuth.authUser,async (req, res)=>{

    let auth = await req.isauth;

    if(auth)
    {
        res.setHeader('Content-Type', 'text/html');
        mynavbar = {'Home' : '/'}
        //now finding the books in the databse 
        let mybooks = await books.find({userid : auth._id});
        let mypdfs = await pdf.find({userid : auth._id});
        let projects = await project.find({userid : auth._id});

        let contenttype = req.params.typeofcon;
        let itsnumber = req.params.number;

        if(contenttype == 4)
        {
            //first check databse exist or not

            if(mybooks.length)
            {
               let mybook = new Array;
               for(i in mybooks)
               {
                   mybook = mybook.concat({bookid : base64encode(mybooks[i].id),title : mybooks[i].title})
               }
                return res.status(200).render('showall',{navTexts : mynavbar, username : auth.fname,type : contenttype,numbers : itsnumber,bookinfo : mybook})
                
            }else
            {
                return res.send('<h4> All books has been deleted </h4>')
           

            }





        }else if(contenttype == 6)
        {

            //for the pdf
            if(mypdfs.length)
            {
               let mypdf = new Array;

               for(i in mypdfs)
               {
                   mypdf = mypdf.concat({pdfid : base64encode(mypdfs[i].id),title : mypdfs[i].title})

               }

                return res.status(200).render('showall',{navTexts : mynavbar, username : auth.fname,type : contenttype,numbers : itsnumber,pdfinfo : mypdf})
                
            }else
            {
                return res.send('<h4> All pdf files has been deleted </h4>')
           

            }




        }else if(contenttype == 8)
        {
            //for the projects...
            if(projects.length)
            {
                let myproject = new Array;

                for(i in projects)
                {
                    myproject = myproject.concat({projectid : base64encode(projects[i].id),title : projects[i].title})
                }
               
                return res.status(200).render('showall',{navTexts : mynavbar, username : auth.fname,type : contenttype,numbers : itsnumber,projectinfo : myproject})
                
            }else
            {
                return res.send('<h4> All projects files has been deleted </h4>')
           

            }


        }else
        {
            return res.send('<h1> Data Cannot be found </h1>');
        }


    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }


})


//for the preview page of books ...
router.get('/bookpreview/:bid/edition',isAuth.authUser, async (req, res)=>{

    let auth = await req.isauth;

    mynavbar = {"Home" : '/'}
    if(auth)
    {
        res.setHeader('Content-Type', 'text/html');

        let bookid = base64decode(req.params.bid);

        let verifydata = await validateData.booksrequirement(bookid,auth._id)

        if(verifydata == 1)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0013</h1>')
        }else if(verifydata == 2)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0014</h1>')
        }else
        {

            return res.status(200).render('bookpreview',{navTexts : mynavbar, username : auth.fname,bookinfo : verifydata})


        }

    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }

})

//for the preview of the pdf files 

router.get('/pdfpreview/:pid/edition',isAuth.authUser,async (req, res)=>{


    let authorised = await req.isauth;

    mynavbar = {"Home" : '/'}

    if(authorised)
    {
        res.setHeader('Content-Type', 'text/html');

        let pdfid = base64decode(req.params.pid);

        let verifydata = await validateData.pdfrequirement(pdfid,authorised._id)

        if(verifydata == 1)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0015</h1>')

        }else if(verifydata == 2)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0016</h1>')
        }else
        {

            return res.status(200).render('pdfpreview',{navTexts : mynavbar, username : authorised.fname,pdfinfo : verifydata})


        }


    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }

})

//for the poject preview page

router.get('/projectpreview/:prid/edition',isAuth.authUser, async (req, res)=>{

    let authorised = await req.isauth;

    mynavbar = {"Home" : '/'}

    if(authorised)
    {
        res.setHeader('Content-Type', 'text/html');

        let projectID = base64decode(req.params.prid);

        let verifydata = await validateData.projectrequirement(projectID,authorised._id)

       

        if(verifydata == 1)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0017</h1>')

        }else if(verifydata == 2)
        {
            return res.status(502).send('<h1> Deleted All Files CODE : BSDB 0018</h1>')
        }else
        {

            return res.status(200).render('projectpreview',{navTexts : mynavbar, username : authorised.fname,projectinfo : verifydata})


        }


    }else
    {
        return res.status(403).redirect('/newregistration/login');
    }

})


//for requesting the books and projects
router.get('/request',isAuth.authUser,async function(req, res){

    let isuser = await req.isauth;

    if(isuser)
    {
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).render('request',{username : isuser.fname,navTexts : {'home' : '/'}})

    }else
    {
        return res.redirect('/newregistration/login');
    }



})

//for the book request

router.get('/bookrequest',isAuth.authUser,async(req,res) =>{

    let isuser = await req.isauth;

    if(isuser)
    {
        //typeofreq =  true for the book and false for the project

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).render('bookandprojectreq',{username : isuser.fname,navTexts : {
            "Home" : '/'
        },typeofreq : true})


    }else
    {
        return res.redirect('/newregistration/login');
    }

})

//after requesting the book verify the data and

router.post('/bookrequest/verifydata',isAuth.authUser,[
    check('pname').not().isEmpty(),
    check('language').not().isEmpty(),

],async (req, res)=>{

    let errorRequest =  validationResult(req);

    if(!errorRequest.isEmpty())
    {
        console.log("error in the request form book");
        return ;
    }

    let isuser = await req.isauth;

    if(isuser)
    {

        let checkExistance = await myrequest.findOne({userid : isuser._id})

        if(checkExistance)
        {
            let mybooklist = checkExistance.bookrequest;

            mybooklist = mybooklist.concat({

                title : req.body.bname,
                aurthor : req.body.aname,
                language : req.body.language,
                booktype : req.body.btype,
                description : req.body.pdis
            })

            myrequest.findOneAndUpdate({userid : isuser._id}, {

                bookrequest : mybooklist

            })
            .catch(err=>{
                console.log(err,"the error is BSDB 019");
            })

        }else
        {
            new myrequest({
                userid : isuser._id,
                bookrequest : [
                    {
                        title : req.body.bname,
                        aurthor : req.body.aname,
                        language : req.body.language,
                        booktype : req.body.btype,
                        description : req.body.pdis
                    }
                ],
             
            }).save()
            .catch(err =>{
                console.log(err,"the error BSDB 019");
            })

           
        }
        
        return res.status(200).redirect('/bookshop/request'); //once data save it will go on request page list

    }else
    {
        return res.redirect('/newregistration/login');
    }


})

//for requesting the project 

router.get('/projectrequest',isAuth.authUser,async(req,res) =>{

    let isuser = await req.isauth;

    if(isuser)
    {
        //typeofreq =  true for the book and false for the project

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).render('bookandprojectreq',{username : isuser.fname,navTexts : {
            "Home" : '/'
        },typeofreq : false})


    }else
    {
        return res.redirect('/newregistration/login');
    }

})

//after requesting the project verify the data and

router.post('/projectrequest/verifydata',isAuth.authUser,[
    check('pname').not().isEmpty(),
    check('language').not().isEmpty(),

],async (req, res)=>{

    let errorRequest =  validationResult(req);

    if(!errorRequest.isEmpty())
    {
        console.log("error in the request form project");
        return ;
    }

    let isuser = await req.isauth;

    if(isuser)
    {

        let checkExistance = await myrequest.findOne({userid : isuser._id})

        if(checkExistance)
        {
            let myprojectlist = checkExistance.projectrequest;

            myprojectlist = myprojectlist.concat({

                title : req.body.pname,
            
                elements : req.body.language,
             
                description : req.body.pdis
            })

            myrequest.findOneAndUpdate({userid : isuser._id}, {

                projectrequest : myprojectlist

            })
            .catch(err=>{
                console.log(err,"the error is BSDB 020");
            })

        }else
        {
            new myrequest({
                userid : isuser._id,
                projectrequest : [
                    {
                        title : req.body.pname,
                    
                        elements : req.body.language,
                     
                        description : req.body.pdis
                    }
                ]
      
            }).save()
            .catch(err =>{
                console.log(err,"the error BSDB 020");
            })

           
        }
        
        return res.status(200).redirect('/bookshop/request'); //once data save it will go on request page list

    }else
    {
        return res.redirect('/newregistration/login');
    }


})

module.exports = router;