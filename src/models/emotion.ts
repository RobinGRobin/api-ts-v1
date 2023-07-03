import { Schema, model } from "mongoose";
import { Emotion } from "../interfaces/emotion.interface";

const EmotionSchema = new Schema<Emotion>(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        classId: {
            type: String,
            required: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const EmotionModel = model("emotions", EmotionSchema);

export default EmotionModel;
