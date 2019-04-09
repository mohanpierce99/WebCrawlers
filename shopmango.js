const express=require('express');

const bodyparser=require('body-parser');

var url = require('url');

const router=express.Router();

const api=require('./task1.js');

router.use(bodyparser.json());

var shopmangomen=api.init("men");

var shopmangowomen=api.init("women");

router.get('/men',async (req,res)=>{
    if(!("type" in req.query))
     res.status(401).send("Please specify a category");

    if(req.query.type.toLowerCase()=="clothing"){

    if(!("ct" in req.query)){
        console.log("ct not available")
        var result=await shopmangomen("clothing",undefined,res);
        res.end();
        return;
    }
     var cts=req.query.ct.split(',');

     var result=await shopmangomen("clothing",cts,res);
     res.end();

    }
    else if(req.query.type.toLowerCase()=="accessories"){
        if(!("ct" in req.query)){
            var result=await shopmangomen("accessories",undefined,res);
            res.end();
            return;
        }
         var cts=req.query.ct.split(',');
            console.log(cts);
         var result=await shopmangomen("accessories",cts,res);
          res.end();
        }
        else{
          res.send("Wrong input Type is categories or accessories and enter the category in the ct param");
        }

});


router.get('/women',async (req,res)=>{
    if(!("type" in req.query))
     res.status(401).send("Please specify a category");

    if(req.query.type.toLowerCase()=="clothing"){

    if(!("ct" in req.query)){
        console.log("ct not available")
        var result=await shopmangowomen("clothing",undefined,res);
        res.end();
        return;
    }
     var cts=req.query.ct.split(',');

     var result=await shopmangowomen("clothing",cts,res);
     res.end();

    }
    else if(req.query.type.toLowerCase()=="accessories"){
        if(!("ct" in req.query)){
            var result=await shopmangowomen("accessories",undefined,res);
            res.end();
            return;
        }
         var cts=req.query.ct.split(',');
            console.log(cts);
         var result=await shopmangowomen("accessories",cts,res);
          res.end();
        }  else{
            res.send("Wrong input Type is categories or accessories and enter the category in the ct param");
          }

});




module.exports=router;
