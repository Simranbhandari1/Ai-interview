const express = require('express');

const cookieParser = require('cookie-parser');
const app= express()//initiate server creating instance 
app.use(express.json())
app.use(cookieParser())
//require all the routes here
const authRouter=require('./routes/auth.routes')

//using all teh route here 
app.use('/api/auth',authRouter) //agr auth related koi bhi request aayegi to usko authRoute handle karega you have to use this prefix

module.exports=app