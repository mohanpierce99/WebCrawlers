const express=require('express');

const bodyparser=require('body-parser');

const app=express();

const shopmango=require("./shopmango.js");
const george=require('./george.js');


app.use('/shopmango',shopmango);

app.use('/george',george);

app.listen(3472);

