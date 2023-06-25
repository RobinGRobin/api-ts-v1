import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
// import { getEmotionsService } from "../services/emotion";

/* AWS Rekognition service imports */
import AWS from "aws-sdk";
import fs from "fs";

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

            client.detectFaces(params, function (err, response) {
                if (err) {
                    console.log("Ocurrió un error: ", err);
                } else {
                    if (response.FaceDetails) {
                        if (response.FaceDetails[0].Emotions) {
                            res.send({
                                emotionDetected:
                                    response.FaceDetails[0].Emotions[0].Type,
                            });
                        }
                    }
                }
            });

            /*
            const response = await getEmotionsService(req.file?.path);
            if (response) {
                console.log(response);
                res.send(response);
            }
            */
        }
    } catch (error) {
        handleHttp(res, "ERROR_FETCHING_AWS_API", error);
    }
};

export { getEmotions };
