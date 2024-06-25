import { Router } from "express";
import {
  getMateriales,
  registerMateriales,
} from "../controllers/materiales.controlles.js";
const router = Router();

router.get("/", getMateriales);
router.post("/register", registerMateriales);


export default router;
