import { Router } from "express";
import userController from "../controllers/user.controller.ts";
import {validate} from "../middlewares/validate.middleware.ts";
import {modifyClaimsSchema} from "../schemas/user.schema.ts";

const router = Router();

router.put(
    '/:id/claims',
    validate('body', modifyClaimsSchema),
    userController.modifyClaims
);

router.get(
    '/',
    userController.getAll
)

export default router;