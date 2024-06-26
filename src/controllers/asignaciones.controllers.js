import { json } from "express";
import pool from "../db.js";






export const getAsiganciones = async (req, res) => {



    try {

        const [rows] = await pool.query(
            `SELECT 
        a.id_asignaciones,
        a.fecha,
        CONCAT(r.nombres_usuario, ' ', r.apellidos_usuario) AS repartidor,
        CONCAT(e.nombres_usuario, ' ', e.apellidos_usuario) AS estudiante,
        m.nombre AS material,
        a.estado_material
        FROM 
        asignaciones a
        JOIN 
        usuarios r ON a.repartidor_id = r.id_usuario
        JOIN 
        usuarios e ON a.estudiante_id = e.id_usuario
        JOIN 
        materiales m ON a.id_material = m.id_material;`);

        res.status(200).json(rows);

    } catch (error) {
        res.status(400).json(error);


    }
}

export const asignarMaterial = async (req, res) => {

    const { id, rol } = req.usuario;

    const { id_material, estado_material, estudiante_id } = req.body;



    try {


        const [rows] = await pool.query('INSERT INTO asignaciones (repartidor_id, estudiante_id, id_material, estado_material) VALUES (?,?,?,?)',
            [id, estudiante_id, id_material, estado_material]);


        res.status(200).json(rows)

    } catch (error) {
        res.status(400).json(error);

    }

}