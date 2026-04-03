const AppError = require("../utilts/App-error");
const util = require("util");

const jwt = require("jsonwebtoken");
const jwtVerifyPromise = util.promisify(jwt.verify);
const User = require("../modules/users");

const auth =async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(!token)
      throw new AppError(401,"no token provided")
  
    const payload = await jwtVerifyPromise(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub)
    if(!user){
      throw  new AppError(404,"user not found")
    }
    req.user=user
    next()
  }
module.exports=auth