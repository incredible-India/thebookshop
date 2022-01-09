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
const mycart = require('./../model/cart')


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

            return res.status(200).render('booksellPreview',{navTexts : mynavBar, username : userName,bookinfo : verifyDataInDB,bookids:req.params.bookid},)
          


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




 //add to  mycart

router.get('/addtocart/:bookid',userAuth.authUser, async (req, res)=>{

    try{

        let mybookid  = base64decode(req.params.bookid)
    

        let verifyFirst = await req.isauth

        if(verifyFirst)
        {
            //verifybookid in books dbs
            verifyDataBook = await allBookInDB.findOne({_id:mybookid})

            if(verifyDataBook)
            {
                if(verifyFirst._id == verifyDataBook.userid)
                {
                    let checkExistace = await mycart.findOne({userid : verifyFirst.id})
                  

                    if(!checkExistace)
                    {

                        new mycart(
                            {
                                userid:verifyFirst.id,
                                items:[
                                    {
                                        bookid:verifyDataBook.id,
                                        title:verifyDataBook.title,
                                        language:verifyDataBook.language,
                                        author:verifyDataBook.aurthor,
                                        price:verifyDataBook.price,
                                        img:verifyDataBook.img[0],
                                        booktype:verifyDataBook.booktype
    
                                    }
                                ]
    
                            }
                        ).save((err)=>{
                            if(err) 
                            {
                                console.log(err);
                                return err
                            }
    
                        })

                    }else

                    {

                     

                        checkExistace.items = checkExistace.items.push({
                            bookid:verifyDataBook.id,
                                        title:verifyDataBook.title,
                                        language:verifyDataBook.language,
                                        author:verifyDataBook.aurthor,
                                        price:verifyDataBook.price,
                                        img:verifyDataBook.img[0],
                                        booktype:verifyDataBook.booktype
                        })
                        mycart.findOneAndUpdate({userid : verifyFirst.id},{
                            items : checkExistace.items
                        },(err)=>{
                            if (err) 
                            {console.log(err,'dbs error')
                                return;
                            }
                            
                        })
                      
                        

                   
                    
                   

                }


                    return res.redirect('/freebooks/show/mycart')
                //    let mynavBar = {'Home':'/'}
                // //    let cartinfo = {}


                //     return res.render('mycart',{
         
                //         navTexts :mynavBar,
                //         username : verifyFirst.fname,
                //         // pdfinfo : verifythePdfIdFromUrl
               
                //        })
                 
                }else
                {
                    return res.send('<h1> We are facing some technical issue bs_sell Err bs001</h1>')
                }

            }else
            {
                return res.send('<h1> Connot show the cart now.. please try latar</h1>')
            }

          
          


        }else
        {
            return res.redirect('/newregistration/login')
        }

    }catch (error) {
        console.log(error);
        return res.redirect('/newregistration/login')
    }

 



 })


//show mycart

router.get('/show/mycart',userAuth.authUser, async (req, res)=>{

    let verifyUser = await req.isauth

    if(verifyUser)
    {
        let mycartItems = await mycart.findOne({userid : verifyUser.id});

        let cartData = new Array;
        let totalamm =0;
        let totalItems =0;
  
        if(mycartItems)
        {
            for (i in mycartItems.items)
            {
             
                cartData[i] = mycartItems.items[i]
                
            }
         
            totalItems = cartData.length
          
            for (i in cartData)

          {
                totalamm = totalamm + Number(cartData[i].price)
           
                
            
          }
          

        }else

        {
            cartData = null
         
        }
    
        let mynavBar = {'Home':'/'}
        return res.render('mycart',{
         
                navTexts :mynavBar,
               username : verifyUser.fname,
                cartValue : cartData
                ,totalitems : totalItems
                ,totalAmount : totalamm
           
                   })

    }else

    {
        return res.redirect('/newregistration/login')
    }

})


// for remove the book
router.get('/remove/cart/:bookid',userAuth.authUser, async (req, res)=>{

   
    bookidURL = base64decode(req.params.bookid)
    
    let isuser  = await req.isauth

    if(isuser)
    {

        myCartItems = await mycart.findOne({userid : isuser.id})

        if(myCartItems)
        {
            itemsINcart = myCartItems.items

            datatoUpdate = new Array()

            for (i=0;i<itemsINcart.length;i++)             {
              
                if(itemsINcart[i].bookid != bookidURL)
                { 
                    
                
                        datatoUpdate.push(itemsINcart[i]) 
                       
                    }
             
                 
                  
                 
                 
            }
          
                try
                {
                    updatadtabase = await mycart.findOneAndUpdate({userid : isuser.id},{items : datatoUpdate})
                    return res.redirect('/freebooks/show/mycart')
                }catch(err)
                {
                    return err
                }
           



        }else
        {
            return res.redirect('<h1> Bad request </h1>')
        }



    }else
    {
        return res.redirect('/newregistration/login')
    }
    
})


//clear all cart items
router.get('/clear/cart',userAuth.authUser, async (req, res)=>
{

    let isuser  = await req.isauth

    if(isuser)
    {
       itemsINcart = await mycart.findOne({userid : isuser.id})

       if(itemsINcart.items.length !=0)
       {

        itemsINcart = []

        try {
            await mycart.findOneAndUpdate({userid : isuser.id},{items : itemsINcart})
            return res.redirect('/freebooks/show/mycart/')
        } catch (error) {
            return err
        }

       }else

       {
           return res.send('<h1> Cart is Empty Already </h1>')
       }

    }else

    {
        return res.redirect('/newregistration/login')
    }


})
module.exports =  router;