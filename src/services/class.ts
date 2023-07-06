import { Document, Types } from "mongoose";
import { classInfo } from "../interfaces/class.interface";
import classInfoModel from "../models/class";
import UserModel from "../models/user";

const createNewClassService = async ({
    name,
    group,
    professorId,
}: classInfo) => {
    const checkIs = await classInfoModel.findOne({ name, professorId });
    if (checkIs) return "CLASS_ALREADY_REGISTERED";

    // Generate class access code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let accessCode = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        accessCode += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    // Register new class on bd
    const responseClassInfo = await classInfoModel.create({
        name,
        group,
        professorId,
        accessCode,
    });
    return `${responseClassInfo._id.valueOf()}`;
};

const updateClassService = async (accessCode: string, studentId: string) => {
    const checkIs = await classInfoModel.findOne({ accessCode });
    if (!checkIs) return "NO_MATCHING_ACCESS_CODE";
    const checkStudent = await classInfoModel.findOne({
        accessCode: accessCode,
        students: studentId,
    });
    console.log("User info in class document: ", checkStudent);
    if (checkStudent) return "USER_ALREADY_IN_CLASS";
    const responseClassInfo = await classInfoModel.updateOne(
        { accessCode: accessCode },
        { $push: { students: studentId } }
    );
    return responseClassInfo;
};

const getClassDetailService = async (idClass: string) => {
    const checkIs = await classInfoModel.findOne({ _id: idClass });
    if (!checkIs) return "NO_CLASS_INFO_FOUND";
    return checkIs;
};

const getClassIdService = async (code: string) => {
    const checkIs = await classInfoModel.findOne({ accessCode: code });
    if (!checkIs) return "NO_CLASS_INFO_FOUND";
    // console.log("Item Class encontrado: ", checkIs);
    return `${checkIs._id.valueOf()}`;
};

const getClassesDetailService = async () => {
    const classes = await classInfoModel.find();
    if (!classes) return "NO_CLASSES_FOUND";
    return classes;
};

const getUserClassesService = async (idUser: string) => {
    const user = await UserModel.findOne({ _id: idUser });
    const classes = user?.classes;
    if (classes) {
        let userClasses: Array<any> = [];
        for (let i = 0; i < classes.length; i++) {
            userClasses[i] = await classInfoModel.findOne({ _id: classes[i] });
        }
        return userClasses;
    }
};

const deleteClassInfoService = async (idClass: string) => {
    const responseData = await classInfoModel.findByIdAndDelete({
        _id: idClass,
    });
    return responseData;
};

export {
    createNewClassService,
    updateClassService,
    getClassDetailService,
    getClassesDetailService,
    deleteClassInfoService,
    getClassIdService,
    getUserClassesService,
};
