import { Request, Response } from "express";
import {
    createNewClassService,
    updateClassService,
    getClassDetailService,
    getClassesDetailService,
    deleteClassInfoService,
    getClassIdService,
    getUserClassesService,
    deleteUserIdService,
    getClassStudentsService,
} from "../services/class";
import { addClassToUserService, deleteClassIdService } from "../services/user";
import {
    deleteEmotionByIdClassService,
    deleteEmotionByIdUserService,
} from "../services/emotion";

const registerNewClassController = async ({ body }: Request, res: Response) => {
    const responseClassInfo = await createNewClassService(body);
    // Agregar la clase creada al documento del usuario profesor
    const responseUser = await addClassToUserService(
        responseClassInfo,
        body.professorId
    );
    res.send(responseClassInfo);
};

// Register user in class
const updateClassController = async (req: Request, res: Response) => {
    const accessCode = req.params.id;
    const studentId = req.body.idStudent;
    const classId = await getClassIdService(accessCode); // Obtiene el id de la clase a la que se va a registrar
    const responseClassInfo = await updateClassService(accessCode, studentId); // Actualiza el arreglo de usuarios en el documento de clases
    const responseStudent = await addClassToUserService(classId, studentId); // Actualiza el arreglo de clases en el documento del estudiante
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

// Se ejecuta cuando un profesor elimina una clase
const deleteClassInfoController = async (req: Request, res: Response) => {
    const accessCode = req.params.accessCode;
    const idClass = await getClassIdService(`${accessCode}`);
    // Encontrar a los alumnos miembros de la clase
    const classDetail = await getClassDetailService(`${idClass}`);
    if (classDetail === "NO_CLASS_INFO_FOUND") return "NO_CLASS_INFO_FOUND";
    // Eliminar el id de la clase en el registro de cada alumno
    const register: any = [];
    classDetail.toJSON().students.map(async (item) => {
        const deletedItem = await deleteClassIdService(idClass, item);
        register.push(deletedItem?.toJSON()._id);
    });
    // Eliminar el id de la clase en el registro del profesor
    const responseProfessor = await deleteClassIdService(
        idClass,
        classDetail.toJSON().professorId
    );
    // Eliminar el registro de emociones de la clase en la base de datos
    const responseEmotions = await deleteEmotionByIdClassService(idClass);
    // Eliminar el registro del documento de clase
    const responseClass = await deleteClassInfoService(idClass);
    res.send({
        classDeleted: responseClass?.toJSON()._id,
        userDocumentsModified: register,
        professorDocumentModified: responseProfessor?.toJSON()._id,
        emotionsDeleted: responseEmotions,
    });
};

// Se ejecuta cuando un estudiante abandona la clase
const deleteStudentInClassController = async (req: Request, res: Response) => {
    const idStudent = req.params.idStudent;
    const accessCode = req.params.accessCode;
    const idClass = await getClassIdService(`${accessCode}`);
    if (idClass === "NO_CLASS_INFO_FOUND") return "NO_CLASS_INFO_FOUND";
    // Se elimina el registro de emociones del estudiante de la base de datos y de la clase en específico
    const responseEmotions = await deleteEmotionByIdUserService(
        idStudent,
        idClass
    );
    // Se modifica el documento del usuario para eliminar el id de la clase
    const response = await deleteClassIdService(idClass, idStudent);
    // Se modifica el documento de la clase para eliminar el id del usuario
    const responseClass = await deleteUserIdService(idClass, idStudent);
    res.send({
        studentDeleted: response?.toJSON()._id,
        emotionsDeleted: responseEmotions,
        classModified: responseClass?.toJSON()._id,
    });
};

const getClassStudentsController = async (req: Request, res: Response) => {
    const idClass = req.params.idClass;
    const students = await getClassStudentsService(idClass);
    if (students) {
        res.send(students);
    } else {
        res.send({ message: "NO_STUDENTS_REGISTERED" });
    }
};

export {
    registerNewClassController,
    updateClassController,
    getClassDetailController,
    getClassesDetailController,
    deleteClassInfoController,
    getUserClassesController,
    getClassStudentsController,
    deleteStudentInClassController,
};
