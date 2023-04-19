import { Router } from "express";
import {
    loginUserController,
    registerUserController,
} from "../controllers/auth";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);

export { router };
