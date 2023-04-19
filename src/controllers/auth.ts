import { Request, Response } from "express";
import { loginUserService, registerNewUserService } from "../services/auth";

const registerUserController = async ({ body }: Request, res: Response) => {
    const responseUser = await registerNewUserService(body);
    res.send(responseUser);
};

const loginUserController = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    const responseUser = await loginUserService({ email, password });

    if (responseUser === "INCORRECT_ PASSWORD") {
        res.status(403);
        res.send(responseUser);
    } else {
        res.send(responseUser);
    }
};

export { registerUserController, loginUserController };
