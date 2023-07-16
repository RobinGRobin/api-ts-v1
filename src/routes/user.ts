import { Request, Response, Router } from "express";
import {
    addProfilePicture,
    deleteUser,
    getUser,
    getUsers,
} from "../controllers/user";
import multerMiddleware from "../middlewares/file";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put(
    "/:id",
    multerMiddleware.single("profilePicture"),
    addProfilePicture
);
router.delete("/:id", deleteUser);

export { router };
