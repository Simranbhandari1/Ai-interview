const moongose=require('mongoose')

async function connectToDB(){
   try{ await moongose.connect(process.env.MongoDB_URI)
    console.log("connected to datbase")
}
    catch (error) {
        console.error("Error connecting to database:", error);
    }
}
module.exports = connectToDB