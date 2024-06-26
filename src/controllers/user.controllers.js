import pool from "../db.js";
import bcrypt from "bcrypt";
import { crearToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKENSECRET } from "../config.js";

export const registerUsers = async (req, res) => {
  const { nombres, apellidos, email, password, rol } = req.body;

  try {
    //Bcrypity
    const passwordHash = await bcrypt.hash(password, 10);

    const [rows] = await pool.query(
      `INSERT INTO usuarios (nombres_usuario, apellidos_usuario, email_usuario, password_usuario, roles_id_rol) VALUES (?,?,?,?,?)`,
      [nombres, apellidos, email, passwordHash, rol]
    );

    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "usuario creado" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM usuarios`);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//login

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const [rows] = await pool.query(
      `SELECT * FROM usuarios WHERE email_usuario=?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    const match = await bcrypt.compare(password, usuario.password_usuario);

    if (match) {
      const token = await crearToken({
        id: usuario.id_usuario,
        rol: usuario.roles_id_rol,
      });
      res.cookie("token", token);

      res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
    } else {
      res.status(404).json({ message: "Credenciales  inválidas" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const consultaToken = async (req, res) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(404).json({ message: "No Autorizado" });
    }

    jwt.verify(token, TOKENSECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token Invalido" });
      }

      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE id_usuario= ?",
        [user.id]
      );

      return res.status(200).json(rows[0]);
    });
  } catch (error) {
    res.status(400).json({ message: "Error No Autorizado" });
  }
};

export const getAllEstudiantes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE roles_id_rol= ?",
      [3]
    );

    return res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ message: "Error No Autorizado", error });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario=?",
      [req.params.id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Error No Autorizado", error });
  }
};

export const editUsuario = async (req, res) => {
  const { nombres, apellidos, email } = req.body;
  try {
    const [rows] = await pool.query(
      "UPDATE usuarios SET  nombres_usuario=?, apellidos_usuario= ?, email_usuario=?  WHERE id_usuario=?",
      [nombres, apellidos, email, req.params.id]
    );

    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Usuario Actaualizado" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error No Autorizado", error });
  }
};
