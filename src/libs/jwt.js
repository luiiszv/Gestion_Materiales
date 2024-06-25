import jwt from "jsonwebtoken";
import { TOKENSECRET } from "../config.js";

export function crearToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKENSECRET,
      {
        expiresIn: "30m",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
