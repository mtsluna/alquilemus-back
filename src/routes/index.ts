import express, { Router } from "express";
import authRouter from './auth.route.ts';
import userRouter from './user.route.ts';
import passport from "../configs/passport.ts";
import {errorMiddleware} from "../middlewares/error.middleware.ts";

const router = Router();

router.use(express.json());
router.use(passport.initialize());

router.use('/auth', authRouter);
router.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    userRouter
);

router.use(errorMiddleware);

export default router;