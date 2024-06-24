import pool from "../db.js";


export const getRoles = async (req, res) => {

    try {
        const [rows] =  await pool.query('SELECT * FROM roles')
        res.status(200).json(rows)


    } catch (error) {
        res.status(400).json(error)

    }


}