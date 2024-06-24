import app from "./app.js";
import pool from "./db.js";



//port






async function dbConexion() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión exitosa a la base de datos");
        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}




app.listen(app.get('port'), () => {
    console.log('server connected on port ', app.get('port'))
    
})
dbConexion();