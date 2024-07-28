import Joi from "joi";
import mongoose from "mongoose";

const objectIdRule = (value , helper)=> {
  const isValid = mongoose.Types.ObjectId.isValid(value);
  if(isValid){
    return value
  }
  return helper.message("invalid object id")
}
export const generalRules = {
  objectId: Joi.custom(objectIdRule),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
    )
    .messages({
      "string.pattern.base":
        "password must contain at least one uppercase, one lowercase, one number and one special character",
      "any.required": "please enter your password",
    }),
  
};