import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

/* AWS Rekognition service imports */
import AWS from "aws-sdk";
import fs from "fs";
import {
    createNewEmotionService,
    getClassEmotionsService,
    getClassEmotionsTodayService,
    getUserEmotionsByClassService,
} from "../services/emotion";

AWS.config.update({ region: "us-east-2" });
const client = new AWS.Rekognition();

const getEmotions = async (req: Request, res: Response) => {
    try {
        if (req.file?.path) {
            const paramsOptions = {
                Image: {
                    Bytes: fs.readFileSync(req.file?.path),
                },
                Attributes: ["ALL"],
            };

            client.detectFaces(paramsOptions, async function (err, response) {
                if (err) {
                    console.log("Ocurrió un error: ", err);
                    const data = await createNewEmotionService({
                        name: "NO_FACE_DETECTED",
                        user: req.params.idStudent,
                        classId: req.params.idClass,
                    });
                    res.send(data);
                } else {
                    if (response.FaceDetails) {
                        if (response.FaceDetails[0].Emotions) {
                            console.log(response.FaceDetails[0].Emotions);
                            const data = await createNewEmotionService({
                                name: `${response.FaceDetails[0].Emotions[0].Type}`,
                                user: req.params.idStudent,
                                classId: req.params.idClass,
                            });
                            res.send(data);
                        }
                    }
                }
            });
        }
    } catch (error) {
        handleHttp(res, "ERROR_FETCHING_AWS_API", error);
    }
};

const getClassEmotionsController = async (req: Request, res: Response) => {
    const idClass = req.params.idClass;
    const response = await getClassEmotionsService(idClass);
    res.send(response);
};

const getClassTodayEmotionsController = async (req: Request, res: Response) => {
    const idClass = req.params.idClass;
    const todayInfo = await getClassEmotionsTodayService(idClass);
    res.send(todayInfo);
};

const getUserEmotionsByClassController = async (
    req: Request,
    res: Response
) => {
    const idClass = req.params.idClass;
    const idUser = req.params.idUser;
    const emotions = await getUserEmotionsByClassService(idUser, idClass);
    res.send(emotions);
};

export {
    getEmotions,
    getClassEmotionsController,
    getClassTodayEmotionsController,
    getUserEmotionsByClassController,
};
