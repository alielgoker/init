import { catchErr, responseE, wrapper } from "../helpers/helpe.func.js";
import Jwt  from "jsonwebtoken";
import User from "../model/user.model.js";
const verifyToken =
  async (req, res , next) => {
    try {
      const token = req.cookies.jwt
      const toekn_env = process.env.JWT_SECRET 
      if(!token){
      return  responseE(res , "Not authorized, please login" , 401)
    }
    const verifyed = Jwt.verify(token , toekn_env)
    const user = await User.findById(verifyed.userId).select("-password")
    if(!user){
      return  responseE(res , "User Not Found" , 400)
    }
    req.user = user;

    next()
  } catch (error) {
      return  responseE(res , "Not authorized, try to login" , 401)
    }
  }

  const adminOnly = (req , res , next)=>{
    if(req.user  && req.user.role === "admin"){
    next()
    }else{
      return responseE(res , "Not authorized as an admin." , 401)
    }
    }
export {
  verifyToken ,
  adminOnly
}