import { Router } from "express";
import {
    registerNewClassController,
    updateClassController,
} from "../controllers/class";

const router = Router();

router.get("/"); // Obtener la información de las materias materia
router.get("/:id"); // Obtener la información de una materia
router.post("/", registerNewClassController); // Crear una materia
router.put("/:id", updateClassController); // Actualizar una materia
router.delete("/:id"); // Eliminar una materia

export { router };
