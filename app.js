const express=require('express');

const bodyparser=require('body-parser');

const app=express();

const shopmango=require("./shopmango.js");


app.use('/shopmango',shopmango);


app.listen(3472);

