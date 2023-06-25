import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({ region: "us-east-2" });

const client = new AWS.Rekognition();

const getEmotionsService = async (path: string) => {
    const params = {
        Image: {
            Bytes: fs.readFileSync(path),
        },
        Attributes: ["ALL"],
    };
    let clientResponse = "";
    client.detectFaces(params, function (err, response) {
        if (err) {
            console.log("Error: ", err);
        } else {
            if (response.FaceDetails) {
                if (response.FaceDetails[0].Emotions) {
                    clientResponse = `${response.FaceDetails[0].Emotions[0].Type}`;
                }
            }
        }
    });
    return clientResponse;
};

export { getEmotionsService };
