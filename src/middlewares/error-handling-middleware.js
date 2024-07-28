import { errorHandlingClass } from "../utils/error-class.utils.js";//importing error handling class from utils


//error handling middleware
export const errorHandling =(API)=>{
    return (req, res, next) => {
        API(req, res, next).catch((err)=>{
            console.log("error in error-handling-middleware", err);
            next (new errorHandlingClass("Internal Server Error", 500,err,err.stack));   
        });
    }
}

//error handling response 
export const errorHandlerResponse = (err, req, res, next) => {     
    if (err) {      
   res.status(err["statusCode"] || 400).json({
                message : "Internal Server Error",            //default message
                statusCode :err.statusCode ,                  //send status code
                error :err.error,                             //what is the error
                knowingError:err.message,
                stack:err.stack
            });
}};
   