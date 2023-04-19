import { Request, Response } from "express";
import { registerNewUserService } from "../services/auth";

const registerUserController = async ({ body }: Request, res: Response) => {
    const responseUser = await registerNewUserService(body);
    res.send(responseUser);
};

const loginUserController = () => {};

export { registerUserController, loginUserController };
