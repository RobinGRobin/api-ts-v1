import { Router } from "express";

const router = Router();

router.get("/"); // Obtener la información de las materias materia
router.get("/:id"); // Obtener la información de una materia
router.post("/"); // Crear una materia
router.put("/:id"); // Actualizar una materia
router.delete("/:id"); // Eliminar una materia

export { router };
