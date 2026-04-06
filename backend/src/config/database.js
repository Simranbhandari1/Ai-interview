const mongoose=require('mongoose')

async function connectToDB(){
   try{ await mongoose.connect(process.env.MongoDB_URI)
    console.log("connected to database")
}
    catch (error) {
        console.error("Error connecting to database:", error);
    }
}
module.exports = connectToDB