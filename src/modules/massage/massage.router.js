import { Router } from "express";
import * as massageController from "./massage.controller.js";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { createMassageSchema } from "./massage.schema.js";

const router = Router();

router.post("/createMassage", validation(createMassageSchema), errorHandling(massageController.createMassage));
router.get("/getAllMassages", authenticationMiddleware(), errorHandling(massageController.getAllMassages));
router.delete("/deleteMassage/:deletedMassage_id", authenticationMiddleware(), errorHandling(massageController.deleteMassage));
router.patch("/favMassages", authenticationMiddleware(), errorHandling(massageController.favMassages));

export default router;