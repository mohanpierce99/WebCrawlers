const express=require('express');

var url = require('url');

const router=express.Router();

const api=require('./genericcode2.js');



var georgemen=api.init("men");

var georgewomen=api.init("women");

router.use(function(req, res, next) {
    req.getUrl = function() {
      return req.protocol + "://" + req.get('host') + req.originalUrl;
    }
    return next();
  });

router.use(['/men','/women'],(req,res,next)=>{
    if(!("type" in req.query)){
        res.status(401).send("Please specify a type");
        return ;
    }
    next();
});

router.use(['/men','/women'],async (req,res,next)=>{
    console.log("entered")
     if(!("ct" in req.query)){
         console.log(req.url);
        if(~req.getUrl().indexOf("women"))
        await georgewomen(req.query.type,undefined,res);
        else{
            await georgemen(req.query.type,undefined,res);

        }
        res.end();
        return;
    }
    next();
});

router.get('/men',async (req,res)=>{
    if(req.query.type.toLowerCase()==="clothing"){
        
        req.query.ct=req.query.ct.replace(/\"/g,"");
        req.query.ct=req.query.ct.replace(/-/g,"&amp;");

     var cts=req.query.ct.split(',');
     var result=await georgemen(req.query.type,cts,res);
     res.end();
    }
    else
          res.send("Wrong input Type is cloting or accessories and enter the category in the ct param");
        

});

router.get('/women',async (req,res)=>{

    if(req.query.type.toLowerCase()==="clothing"){
        req.query.ct=req.query.ct.replace(/\"/g,"");
        req.query.ct=req.query.ct.replace(/-/g,"&amp;");
        var cts=req.query.ct.split(',');
        var result=await georgewomen(req.query.type,cts,res);
        res.end();
       }
       else
             res.send("Wrong input Type is cloting or accessories and enter the category in the ct param");

});




module.exports=router;

