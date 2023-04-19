import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

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

const loginUserService = async ({ email, password }: Auth) => {
    const checkIs = await UserModel.findOne({ email });
    if (!checkIs) return "NO_USER_FOUND";

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) return "INCORRECT_ PASSWORD";

    const token = await generateToken(checkIs.email);

    const data = {
        token,
        user: checkIs,
    };

    return data;
};

export { registerNewUserService, loginUserService };
