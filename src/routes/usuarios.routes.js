import { Router } from "express";
import {
  getUsers,
  registerUsers,
  login,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", registerUsers);
router.post("/login", login);

export default router;
