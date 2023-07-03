import { Schema, model } from "mongoose";
import { classInfo } from "../interfaces/class.interface";

const classInfoSchema = new Schema<classInfo>(
    {
        name: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            required: true,
        },
        professorId: {
            type: String,
            required: true,
        },
        accessCode: {
            type: String,
            default: null,
        },
        students: {
            type: [],
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const classInfoModel = model("classes", classInfoSchema);

export default classInfoModel;
