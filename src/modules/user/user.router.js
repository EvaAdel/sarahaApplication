import { Router } from "express";
import * as userController from "./user.controller.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { signInSchema, signUpSchema } from "./user.schema.js";

const router = Router();

router.post("/signup", validation(signUpSchema), errorHandling(userController.signUp));
router.get("/confirmEmail/:token", errorHandling(userController.confirmEmail));    
router.post("/signin", validation(signInSchema), errorHandling(userController.signIn));
export default router  