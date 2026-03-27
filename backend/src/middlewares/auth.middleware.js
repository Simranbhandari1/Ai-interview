const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");
async function authUser(req, res, next) {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized, token not found"})
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

    if(isTokenBlacklisted){
        return res.status(401).json({message:"Unauthorized, token has been blacklisted"})
    }

try{
const decoded = jwt.verify(token, process.env.JWT_SECRET)
req.user = decoded 
next()
}catch(err){
    return res.status(401).json({message:"Unauthorized, invalid token"})
}

}

module.exports={authUser}