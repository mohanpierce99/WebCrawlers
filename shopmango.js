const express=require('express');


var url = require('url');

const router=express.Router();

const api=require('./genericcode.js');

const arrayofimages=require('./arrayofimages.js');



var shopmangomen=api.init("men");

var shopmangomenarr=arrayofimages.init("men");

var shopmangowomenarr=arrayofimages.init("women");

var shopmangowomen=api.init("women");

router.use(function(req, res, next) {
    req.getUrl = function() {
      return req.protocol + "://" + req.get('host') + req.originalUrl;
    }
    return next();
  });

router.use(['/men','/women','/array/men','/array/women'],(req,res,next)=>{
    if(!("type" in req.query)){
        res.status(401).send("Please specify a type");
        return ;
    }
    next();
});

router.use(['/men','/women','/array/men','/array/women'],async (req,res,next)=>{
  
     if(!("ct" in req.query)){
         console.log(req.url);
         console.log("hit");
         if(~req.getUrl().indexOf("women"))
         await shopmangowomen(req.query.type,undefined,res,req.query.browser);
         else{
             await shopmangomen(req.query.type,undefined,res,req.query.browser);

         }
         return ;
    }
    next();
});

router.get('/men',async (req,res)=>{
    if(req.query.type.toLowerCase()==="clothing"||"accessories"){
     var cts=req.query.ct.split(',');
     var result=await shopmangomen(req.query.type,cts,res,req.query.browser);
    }
    else
          res.send("Wrong input Type is clothing or accessories and enter the category in the ct param");
        

});

router.get('/women',async (req,res)=>{

    if(req.query.type.toLowerCase()==="clothing"||"accessories"){
        var cts=req.query.ct.split(',');
        var result=await shopmangowomen(req.query.type,cts,res,req.query.browser);
       }
       else
             res.send("Wrong input Type is clothing or accessories and enter the category in the ct param");

});

router.get('/array/men',async (req,res)=>{

    if(req.query.type.toLowerCase()==="clothing"||"accessories"){
     var cts=req.query.ct.split(',');
     var result=await shopmangomenarr(req.query.type,cts,res,req.query.browser);
    }
        else{
          res.send("Wrong input Type is clothing or accessories and enter the category in the ct param");
        }

});

router.get('/array/women',async (req,res)=>{

    if(req.query.type.toLowerCase()==="clothing"||"accessories"){
     var cts=req.query.ct.split(',');
     var result=await shopmangowomenarr(req.query.type,cts,res,req.query.browser);
    }
        else{
          res.send("Wrong input Type is clothing or accessories and enter the category in the ct param");
        }

});


module.exports=router;
