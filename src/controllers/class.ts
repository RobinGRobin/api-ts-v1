import { Request, Response } from "express";
import { createNewClassService, updateClassService } from "../services/class";

const registerNewClassController = async ({ body }: Request, res: Response) => {
    const responseClassInfo = await createNewClassService(body);
    res.send(responseClassInfo);
};

const updateClassController = async (req: Request, res: Response) => {
    const accessCode = req.params.id;
    const studentId = req.body;
    console.log(accessCode);
    const responseClassInfo = await updateClassService(accessCode, studentId);
    res.send(responseClassInfo);
};

export { registerNewClassController, updateClassController };
