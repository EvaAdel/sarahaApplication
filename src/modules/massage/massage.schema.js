import Joi from "joi";
import { generalRules } from "../../utils/general-rules.utils.js";

//validation for create massage
export const createMassageSchema = {
  body: Joi.object({
    content: Joi.string().required(),
    deliveredUser: generalRules.objectId.required(),
    senderName: Joi.string(),
  }),
};
  

