import {errorHandlingClass} from '../utils/error-class.utils.js';   //importing error handling class from utils

/**
 * @param {object} schema - Joi schema object
 * @returns  {Function} - Middleware function
 * @description - Middleware function to validate the request data against the schema
*/

const reqKeys =["body", "params", "query", "headers"];
export const validation = (schema) => {
 
    return (req, res, next) => {
 // Initialize validation errors array
        let validationError = [];
        for (const key of reqKeys){
        // Validate the request data against the schema of the same key
            const validationResult = schema[key]?.validate(req[key],
                {abortEarly : false});             //to show all errors
           // If there is an error, push the error details to the validationErrors array
             if (validationResult?.error){
             validationError.push(validationResult?.error?.details);
        
        }
}


 if (validationError.length > 0) {
      console.log(validationError);
        return next(new errorHandlingClass("validation error", 400,validationError));
      }
      
      next();
    };
  }
    