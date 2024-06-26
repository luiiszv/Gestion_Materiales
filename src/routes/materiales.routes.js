import { Router } from "express";
import {
  getMateriales,
  registerMateriales,
  misMateriales

} from "../controllers/materiales.controlles.js";


import { validarToken } from "../middlewares/validateToken.js";
import { asignarMaterial, getAsiganciones } from "../controllers/asignaciones.controllers.js";
const router = Router();

router.get("/", getMateriales);
router.post("/register", registerMateriales);


router.post("/asignar", validarToken, asignarMaterial);

router.get("/asignaciones", getAsiganciones);


router.get("/misMateriales", validarToken, misMateriales);








export default router;
