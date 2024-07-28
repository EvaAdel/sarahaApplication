import jwt from "jsonwebtoken"       //Token library

import { errorHandlingClass } from "../utils/error-class.utils.js"     //importing error handling class from utils
import User from "../../DB/models/user.model.js";                      //importing user model from DB


export const authenticationMiddleware = () => {
  return async (req, res, next) => {
    const { token } = req.headers;

      if (!token)
        // check if token exist or not
        return next(new errorHandlingClass("token not found", 404));

    // check if BEARER_SECRET exist or not
    if (!token.startsWith(process.env.BEARER_SECRET))
      return next(new errorHandlingClass("token is invalid", 401));
    const originalToken = token.split(" ")[1];   //get the token without BEARER_SECRET
    let data; 
    try { 
    //check if token is valid
      data = jwt.verify(originalToken, process.env.JWT_SECRET_LOGIN_USER);
    } catch (error) {
    //if token is invalid send error!  
      next(new errorHandlingClass("token is invalid", 401));
    }

    // check if user exist in token or not
    if (!data?.tokenInfo) {
      return next(new errorHandlingClass("Invalid token payload", 400));
    }
    
    const userData = await User.findById(data?.tokenInfo);
    
    // check if user exist or not in DB
    if (!userData) {
      return next(new errorHandlingClass("user not found", 404));
    }

    // add user data to req object
    req.authUser = userData;
    next();
  };
}
