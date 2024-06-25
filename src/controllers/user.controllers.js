import pool from "../db.js";
import bcrypt from "bcrypt";
import { crearToken } from "../libs/jwt.js";

export const registerUsers = async (req, res) => {
  const { nombre, apellidos, email, password, rol } = req.body;

  try {
    //Bcrypity
    const passwordHash = await bcrypt.hash(password, 10);

    const [rows] = await pool.query(
      `INSERT INTO usuarios (nombres_usuario, apellidos_usuario, email_usuario, password_usuario, roles_id_rol) VALUES (?,?,?,?,?)`,
      [nombre, apellidos, email, passwordHash, rol]
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
      res.status(401).json({ message: "Credenciales  inválidas" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
