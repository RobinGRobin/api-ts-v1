import { Router } from "express";
import {
    loginUserController,
    registerUserController,
} from "../controllers/auth";
import multerMiddleware from "../middlewares/file";

const router = Router();

router.post(
    "/register",
    multerMiddleware.single("profilePicture"),
    registerUserController
);
router.post("/login", loginUserController);

export { router };
