import { Router } from "express";
import {
    deleteClassInfoController,
    deleteStudentInClassController,
    getClassDetailController,
    getClassStudentsController,
    getClassesDetailController,
    getUserClassesController,
    registerNewClassController,
    updateClassController,
} from "../controllers/class";

const router = Router();

router.get("/", getClassesDetailController); // Obtener la información de las materias materia
router.get("/:id", getClassDetailController); // Obtener la información de una materia
router.post("/", registerNewClassController); // Crear una materia

router.put("/:id", updateClassController); // Actualizar una materia - registrar alumnos en materias

router.delete("/professor/:accessCode", deleteClassInfoController); // Eliminar una materia (profesor)
router.delete("/:idStudent/:accessCode", deleteStudentInClassController); // Eliminar una materia (estudiante)

// Obtener las materias registradas en un usuario
router.get("/user/:id", getUserClassesController);

// Obtener los estudiantes registrados en una clase
router.get("/students/:idClass", getClassStudentsController);

export { router };
