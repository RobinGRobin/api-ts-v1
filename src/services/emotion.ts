import { Emotion } from "../interfaces/emotion.interface";
import EmotionModel from "../models/emotion";

const createNewEmotionService = async ({ name, user, classId }: Emotion) => {
    const newEmotion = await EmotionModel.create({ name, user, classId });
    return newEmotion;
};

const getClassEmotionsService = async (idClass: string) => {
    const Emotions = await EmotionModel.find({ classId: idClass });
    return Emotions;
};

const getClassEmotionsTodayService = async (idClass: string) => {
    const today = new Date(Date.now());
    const date =
        today.getFullYear().toString() +
        "-" +
        (today.getMonth() + 1).toString() +
        "-" +
        today.getDate();
    const emotions = await EmotionModel.find({
        createdAt: {
            $gte: new Date(date),
        },
        classId: idClass,
    });
    return emotions;
};

const deleteEmotionByIdClassService = async (idClass: string) => {
    const response = await EmotionModel.deleteMany({ classId: idClass });
    return response;
};

const deleteEmotionByIdUserService = async (idStudent: string) => {
    const response = await EmotionModel.deleteMany({ user: idStudent });
    return response;
};

const getUserEmotionsByClassService = async (
    idUser: string,
    idClass: string
) => {
    const response = await EmotionModel.find({
        user: idUser,
        classId: idClass,
    });
    return response;
};

export {
    createNewEmotionService,
    getClassEmotionsService,
    getClassEmotionsTodayService,
    getUserEmotionsByClassService,
    deleteEmotionByIdClassService,
    deleteEmotionByIdUserService,
};
