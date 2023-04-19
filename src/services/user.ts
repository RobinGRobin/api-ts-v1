import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";

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

export {
    getUsersService,
    getUserService,
    deleteUserService,
    addProfilePictureService,
};
