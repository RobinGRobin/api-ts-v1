import { Router } from "express";
import multerMiddleware from "../middlewares/file";
import {
    getClassEmotionsController,
    getEmotions,
} from "../controllers/emotion";

const router = Router();

router.post(
    "/:idStudent/:idClass",
    multerMiddleware.single("facePicture"),
    getEmotions
); // Petición a API de AWS
router.get("/:idClass", getClassEmotionsController);

export { router };
