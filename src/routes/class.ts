import { Router } from "express";
import {
    deleteClassInfoController,
    getClassDetailController,
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
router.delete("/:id", deleteClassInfoController); // Eliminar una materia

// Obtener las materias registradas en un usuario
router.get("/user/:id", getUserClassesController);

export { router };
