/* in this page all the routing related with buy ,cart, comments manged*/
const express = require('express')
const router = express.Router()
const allBookInDB = require('./../model/books');//all the book on this side are kept in this 
const allPdfInDB = require('./../model/pdf');//all the pdf are kept in this...
const allProjectInDb = require('./../model/projects');// all the projects are kept inside this...
const {base64encode,base64decode} =require('nodejs-base64');
const userAuth =  require('./../authentication/userAuth');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); //cookies
const path = require('path');
const mainUser = require('./../model/user');

router.use(express.static(path.join(__dirname + './../')))
router.use(cookieParser());//if we will not use this it will give error that jwt of undefined
//for the books...

router.get('/:bookid',userAuth.authUser ,async (req, res) => {

    try {

            //first we will check that user is authenticated or not for different navbar options
            //checking authentication for the user 
        let verifiedUser = await req.isauth;

        if(verifiedUser)
        {
            mynavBar = {'Home':'/','cart' : '/'}
            userName =  verifiedUser.fname;
        }else
        {
             mynavBar = {'Home':'/'}
             userName = 'User'
        }

    
        let bookID = base64decode(req.params.bookid);

        let verifyDataInDB = await allBookInDB.findOne({_id : bookID})

        if(verifyDataInDB) {
            //after varifying the data we will show the all information related to book
            //now sending the all bookinformtion to the 

            return res.status(200).render('booksellPreview',{navTexts : mynavBar, username : userName,bookinfo : verifyDataInDB},)
          


        }else

        {
            return res.status(404).json({message : "No data Found", errorCode : 404})
        }
     
        
    } catch (error) {
        
        console.log("Oppps... try latar in /:bookid sellcart.js");

    }

   
})

//for the PDF...
router.get('/pdfs/:pdfid/show',userAuth.authUser,async(req, res, next)=>{

   try {
    let pdfIdFromUrl = base64decode(req.params.pdfid);

    let verifythePdfIdFromUrl = await allPdfInDB.findOne({_id : pdfIdFromUrl})

    if(verifythePdfIdFromUrl)
    {
        
           let verifiedUser = await req.isauth;

        if(verifiedUser)
        {
            mynavBar = {'Home':'/','cart' : '/'}
            userName =  verifiedUser.fname;
        }else
        {
             mynavBar = {'Home':'/'}
             userName = 'User'
        }


        
        return res.status(200).render('pdfpreviewsell',{
         
         navTexts :mynavBar,
         username : userName,
         pdfinfo : verifythePdfIdFromUrl

        })

    }else
    {
        return res.status(404).json({message : "No data Found", errorCode : 404})
    }

   } catch (error) {

    console.log("Error in showing the pdf page ",error);
    
   }




})
//if user click to dowload pdf file





//for the project

router.get('/projects/:projectid/show',userAuth.authUser, async (req, res)=>{

    try {
     let projectIdFromUrl = base64decode(req.params.projectid);
 
     let verifytheProjectIdFromUrl = await allProjectInDb.findOne({_id : projectIdFromUrl})
 
     if(verifytheProjectIdFromUrl)
     {
         
        let verifiedUser = await req.isauth;

    

        if(verifiedUser)
        {
            mynavBar = {'Home':'/','cart' : '/'}
            userName =  verifiedUser.fname;
        }else
        {
             mynavBar = {'Home':'/'}
             userName = 'User'
        }

        // for printing the project owner name in  project download preview page

        let projectOwner =  await mainUser.findOne({_id :verifytheProjectIdFromUrl.userid});

        if(projectOwner)
        {
            userNAMEi = projectOwner.fname + " " +projectOwner.lname;

        }else
        {
            userNAMEi = "Not Available"
        }
        
       

        return res.status(200).render('projectsellpreview',{
         
         navTexts :mynavBar,
         username : userName,
         project : verifytheProjectIdFromUrl
         ,projectowner : userNAMEi

        })

     }else
     {
         return res.status(404).json({message : "No data Found", errorCode : 404})
     }
 
    } catch (error) {
 
     console.log("Error in showing the pdf page ",error);
     
    }
 
 
 
 
 })






module.exports =  router;