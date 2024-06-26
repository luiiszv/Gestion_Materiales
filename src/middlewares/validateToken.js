import jwt from "jsonwebtoken";
import { TOKENSECRET } from "../config.js";


export const validarToken = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) res.status(401).json({ message: "No hay token" });

    jwt.verify(token, TOKENSECRET, (err, usuario) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Token expirado" });
            }
        }


        req.usuario = usuario
        next();
    })

}