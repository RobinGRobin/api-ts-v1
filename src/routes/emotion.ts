import { Router } from "express";
import multerMiddleware from "../middlewares/file";
import { getEmotions } from "../controllers/emotion";

const router = Router();

router.post(
    "/:idStudent/:idClass",
    multerMiddleware.single("facePicture"),
    getEmotions
); // Petición a API de AWS

export { router };
