import { Router } from "express";
import multerMiddleware from "../middlewares/file";
import {
    getClassEmotionsController,
    getEmotions,
} from "../controllers/emotion";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.post(
    "/:idStudent/:idClass",
    multerMiddleware.single("facePicture"),
    checkJwt,
    getEmotions
); // Petición a API de AWS
router.get("/:idClass", checkJwt, getClassEmotionsController);

export { router };
