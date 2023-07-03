import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

/* AWS Rekognition service imports */
import AWS from "aws-sdk";
import fs from "fs";
import { createNewEmotionService } from "../services/emotion";

AWS.config.update({ region: "us-east-2" });
const client = new AWS.Rekognition();

const getEmotions = async (req: Request, res: Response) => {
    try {
        if (req.file?.path) {
            const params = {
                Image: {
                    Bytes: fs.readFileSync(req.file?.path),
                },
                Attributes: ["ALL"],
            };

            const data = await createNewEmotionService({
                name: "Prueba",
                user: req.params.id,
                classId: "",
            });
            res.send(data);

            /*
            client.detectFaces(params, async function (err, response) {
                if (err) {
                    console.log("Ocurrió un error: ", err);
                } else {
                    if (response.FaceDetails) {
                        if (response.FaceDetails[0].Emotions) {
                            const data = await createNewEmotionService({
                                name: `${response.FaceDetails[0].Emotions[0].Type}`,
                                user: req.params.id,
                                classId: "",
                            });
                            res.send(data);
                        }
                    }
                }
            }); */
        }
    } catch (error) {
        handleHttp(res, "ERROR_FETCHING_AWS_API", error);
    }
};

export { getEmotions };
