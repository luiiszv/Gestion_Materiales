import express from "express";
import morgan from "morgan";
const app = express();



//rutas
import userRoutes from "./routes/usuarios.routes.js";
import rolesRoutes from "./routes/roles.routes.js";

app.use(express.json());
app.use(morgan("dev"));
app.set('port', 3000);



app.use('/users', userRoutes);
app.use('/roles', rolesRoutes);




export default app;