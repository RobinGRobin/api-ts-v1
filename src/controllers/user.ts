import { Request, Response } from "express";
import {
    addProfilePictureService,
    deleteUserService,
    getUserService,
    getUsersService,
} from "../services/user";
import { handleHttp } from "../utils/error.handle";

const getUsers = async (req: Request, res: Response) => {
    try {
        const response = await getUsersService();
        res.send(response);
    } catch (error) {
        handleHttp(res, "ERRROR_GET_USERS", error);
    }
};

const getUser = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getUserService(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (error) {
        handleHttp(res, "ERROR_GET_USER", error);
    }
};

const addProfilePicture = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const path = req.file?.path;
        const responseUser = await addProfilePictureService(`${path}`, id);
        res.send(responseUser);
    } catch (error) {
        handleHttp(res, "ERROR_ADDING_PICTURE", error);
    }
};

const deleteUser = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteUserService(id);
        res.send(response);
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_USER", error);
    }
};

export { getUser, getUsers, addProfilePicture, deleteUser };
