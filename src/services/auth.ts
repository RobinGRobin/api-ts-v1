import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt } from "../utils/bcrypt.handle";

const registerNewUserService = async (body: User) => {
    const {
        name,
        email,
        password,
        age,
        imagePath,
        mobileNumber,
        typeUser,
        classes,
    } = body;
    const checkIs = await UserModel.findOne({ email });
    if (checkIs) return "USER_ALREADY_EXISTS";
    const passHash = await encrypt(password);
    const registerNewUser = await UserModel.create({
        name,
        email,
        password: passHash,
        age,
        imagePath,
        mobileNumber,
        typeUser,
        classes,
    });
    return registerNewUser;
};

const loginUserService = () => {};

export { registerNewUserService, loginUserService };
