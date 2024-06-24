import express from "express";
import morgan from "morgan";
const app = express();



//rutas
import userRoutes from "./routes/usuarios.routes.js";


app.use(express.json());
app.use(morgan("dev"));
app.set('port', 3000);



app.use('/', userRoutes);



export default app;