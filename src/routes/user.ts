import { Request, Response, Router } from "express";
import {
    addProfilePicture,
    deleteUser,
    getUser,
    getUsers,
} from "../controllers/user";
import multerMiddleware from "../middlewares/file";

const router = Router();

router.get("/", getUsers);
router.get("/test", (req: Request, res: Response) => {
    console.log("in test route");
    res.send("EN RUTA DE PRUEBA");
    res.send(res.header);
});
router.get("/:id", getUser);
router.put(
    "/:id",
    multerMiddleware.single("profilePicture"),
    addProfilePicture
);
router.delete("/:id", deleteUser);

export { router };
