import { Router } from "express";
import {
  getUsers,
  registerUsers,
  login,
  consultaToken
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", registerUsers);
router.post("/login", login);

//validat toen
router.get("/verificar", consultaToken);

export default router;
