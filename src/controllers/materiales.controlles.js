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
  const { nombreMaterial, descripcion_material } = req.body;

  try {
    const [rows] = await pool.query(
      `INSERT INTO materiales (nombre, descripcion_material) VALUES (?,?)`,
      [nombreMaterial, descripcion_material]
    );



    if (rows.affectedRows > 0) {
      console.log('si')
      res.status(200).json({ message: 'regsitro Correcatamente' })
    }
  } catch (error) {
    res.status(200).json(error);
  }
};




export const misMateriales = async (req, res) => {

  try {
    console.log(req.usuario)

    const [rows]= await pool.query(`SELECT a.*, m.nombre AS nombre_material
    FROM asignaciones a
    JOIN materiales m ON a.id_material = m.id_material
    WHERE a.estudiante_id = ?;
  `, [req.usuario.id]);
    res.status(200).json(rows)

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }

}
