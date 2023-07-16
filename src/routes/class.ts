import { Router } from "express";
import {
    deleteClassInfoController,
    getClassDetailController,
    getClassesDetailController,
    getUserClassesController,
    registerNewClassController,
    updateClassController,
} from "../controllers/class";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/", checkJwt, getClassesDetailController); // Obtener la información de las materias materia
router.get("/:id", checkJwt, getClassDetailController); // Obtener la información de una materia
router.post("/", checkJwt, registerNewClassController); // Crear una materia
router.put("/:id", checkJwt, updateClassController); // Actualizar una materia - registrar alumnos en materias
router.delete("/:id", checkJwt, deleteClassInfoController); // Eliminar una materia

// Obtener las materias registradas en un usuario
router.get("/user/:id", checkJwt, getUserClassesController);

export { router };
