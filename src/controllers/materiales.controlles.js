import pool from "../db.js";

export const getMateriales = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM materiales`);

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const registerMateriales = async (req, res) => {
  const { nombreMaterial, descripcionMaterial } = req.body;

  try {
    const [rows] = await pool.query(
      `INSERT INTO materiale (nombre, descripcion_material)`,
      [nombreMaterial, descripcionMaterial]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(200).json(error);
  }
};
