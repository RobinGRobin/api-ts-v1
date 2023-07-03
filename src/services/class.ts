import { classInfo } from "../interfaces/class.interface";
import classInfoModel from "../models/class";

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
    return responseClassInfo;
};

const updateClassService = async (accessCode: string, studentId: string) => {
    console.log("looking for: ", accessCode);
    const checkIs = await classInfoModel.findOne({ accessCode });
    if (!checkIs) return "NO_MATCHING_ACCESS_CODE";
    const checkStudent = await classInfoModel.findOne({ students: studentId });
    if (checkStudent) return "USER_ALREADY_IN_CLASS";
    const responseClassInfo = await classInfoModel.updateOne(
        { accessCode: accessCode },
        { $push: { students: studentId } }
    );
    return responseClassInfo;
};

export { createNewClassService, updateClassService };
