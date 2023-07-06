import { Request, Response } from "express";
import {
    createNewClassService,
    updateClassService,
    getClassDetailService,
    getClassesDetailService,
    deleteClassInfoService,
    getClassIdService,
    getUserClassesService,
} from "../services/class";
import { addClassToUserService } from "../services/user";

const registerNewClassController = async ({ body }: Request, res: Response) => {
    const responseClassInfo = await createNewClassService(body);
    // Agregar la clase creada al documento del usuario profesor
    console.log("Clase creada: ", responseClassInfo);
    const responseUser = await addClassToUserService(
        responseClassInfo,
        body.professorId
    );
    console.log("Professor Document modified: ", responseUser);
    res.send(responseClassInfo);
};

// Register user in class
const updateClassController = async (req: Request, res: Response) => {
    const accessCode = req.params.id;
    const studentId = req.body.idStudent;
    const classId = await getClassIdService(accessCode); // Obtiene el id de la clase a la que se va a registrar
    console.log(
        "Se va a registrar al estudiante: ",
        studentId,
        " en la clase: ",
        classId,
        " con código de acceso: ",
        accessCode
    );
    const responseClassInfo = await updateClassService(accessCode, studentId); // Actualiza el arreglo de usuarios en el documento de clases
    console.log("Document class modification: ", responseClassInfo);
    const responseStudent = await addClassToUserService(classId, studentId); // Actualiza el arreglo de clases en el documento del estudiante
    console.log("Document student modification: ", responseStudent);
    res.send({ responseClassInfo, responseStudent });
};

const getClassDetailController = async (req: Request, res: Response) => {
    const idClass = req.params.id;
    const responseClassInfo = await getClassDetailService(idClass);
    res.send(responseClassInfo);
};

const getClassesDetailController = async (req: Request, res: Response) => {
    const responseClassesInfo = await getClassesDetailService();
    res.send(responseClassesInfo);
};

const getUserClassesController = async (req: Request, res: Response) => {
    const responseClassInfo = await getUserClassesService(req.params.id);
    res.send(responseClassInfo);
};

const deleteClassInfoController = async (req: Request, res: Response) => {
    const idClass = req.params.id;
    const response = await deleteClassInfoService(idClass);
    res.send(response);
};

export {
    registerNewClassController,
    updateClassController,
    getClassDetailController,
    getClassesDetailController,
    deleteClassInfoController,
    getUserClassesController,
};
