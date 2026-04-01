require('dotenv').config()//load environment variables from .env file
const app=require('./src/app')
const connectToDB=require('./src/config/database')
const invokeGeminiAi = require('./src/services/ai.service')
connectToDB()
invokeGeminiAi();
app.listen(5000,()=>{
    console.log('server is running on port 5000')
})