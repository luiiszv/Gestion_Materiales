import pool from "../db.js";




export const registerUser = (req, res) => {

    const { nombre, apellidos, email, password } = req.body;

    try {

        const [rows]= pool.query(`INSERT INTO usuarios (nombre_usuario, apellidos_usuario, email_usuario, password_usuario, roles_id)`)

        res.status(200).json({message: 'usuario creado'})
        
    } catch (error) {
        res.status(400).json(error)
        
    }

}