const express = require('express');

const cookieParser = require('cookie-parser');
const app = express(); //initiate server creating instance
const cors = require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ your frontend
    credentials: true,
  }),
);
//require all the routes here
const authRouter = require('./routes/auth.routes');
//step2
const interviewRouter = require('./routes/interview.routes');


//using all teh route here
app.use('/api/auth', authRouter); //agr auth related koi bhi request aayegi to usko authRoute handle karega you have to use this prefix
app.use('/api/interview', interviewRouter); //agr interview related koi bhi request aayegi to usko interviewRouter handle karega you have to use this prefix

module.exports = app;
