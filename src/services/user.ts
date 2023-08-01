import UserModel from "../models/user";

const getUsersService = async () => {
    const responseUsers = await UserModel.find({});
    return responseUsers;
};

const getUserService = async (id: string) => {
    const responseUser = await UserModel.find({ _id: id });
    return responseUser;
};

const deleteUserService = async (id: string) => {
    const responseUser = await UserModel.findOneAndDelete({ _id: id });
    return responseUser;
};

const addProfilePictureService = async (imageRoute: string, id: string) => {
    const responseUser = await UserModel.findOneAndUpdate(
        {
            _id: id,
        },
        {
            imagePath: imageRoute,
        },
        {
            new: true,
        }
    );
    return responseUser;
};

const addClassToUserService = async (idClass: string, idUser: string) => {
    const responseUser = await UserModel.updateOne(
        { _id: idUser },
        { $push: { classes: idClass } }
    );
    return responseUser;
};

const deleteClassIdService = async (idClass: string, idUser: string) => {
    const response = await UserModel.findOneAndUpdate(
        { _id: idUser },
        { $pull: { classes: idClass } }
    );
    return response;
};

export {
    getUsersService,
    getUserService,
    deleteUserService,
    addProfilePictureService,
    addClassToUserService,
    deleteClassIdService,
};
