import { Router } from "express";
import multerMiddleware from "../middlewares/file";
import {
    getClassEmotionsController,
    getClassTodayEmotionsController,
    getEmotions,
} from "../controllers/emotion";
import { getUserEmotionsByClassController } from "../controllers/emotion";

const router = Router();

router.post(
    "/:idStudent/:idClass",
    multerMiddleware.single("facePicture"),
    getEmotions
); // Petición a API de AWS
router.get("/:idClass", getClassEmotionsController);
router.get("/today/:idClass", getClassTodayEmotionsController);
router.get("/user/:idUser/:idClass", getUserEmotionsByClassController);

export { router };
