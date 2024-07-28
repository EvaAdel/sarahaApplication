import Joi from "joi";

import { generalRules } from './../../utils/general-rules.utils.js';

//validation for sign up
export const signUpSchema = {
    body:Joi.object({
    name: Joi.string().required().messages({
        "string.base": "name must be a type of string",
        "any.required": "please enter your name",
    }),
    email: Joi.string().email().required(),
    password:generalRules.password.required()   
})}

//validation for login
export const signInSchema ={ 
    body:Joi.object({
       email:Joi.string().email().required(),
        password: generalRules.password.required()
    })}