import express from "express";
import morgan from "morgan";
const app = express();
import cors from "cors";

//rutas
import userRoutes from "./routes/usuarios.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import materialesRoutes from "./routes/materiales.routes.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.set("port", 3000);

//----- ;)

app.use("/users", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/materiales", materialesRoutes);

export default app;
