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

const deleteEmotionByIdClassService = async (idClass: string) => {
    const response = await EmotionModel.deleteMany({ classId: idClass });
    return response;
};

const deleteEmotionByIdUserService = async (idStudent: string) => {
    const response = await EmotionModel.deleteMany({ user: idStudent });
    return response;
};

export {
    createNewEmotionService,
    getClassEmotionsService,
    deleteEmotionByIdClassService,
    deleteEmotionByIdUserService,
};
