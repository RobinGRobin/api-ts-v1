import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            default: null,
        },
        mobileNumber: {
            type: String,
            unique: true,
            default: null,
        },
        typeUser: {
            type: String,
            default: "student",
        },
        classes: {
            type: [],
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const UserModel = model("users", UserSchema);

export default UserModel;
