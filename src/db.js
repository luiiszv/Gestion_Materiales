import {PORT, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_USER, DB_PORT}from  "./config.js";
import {createPool} from "mysql2/promise";

const pool  = createPool({
    host: DB_HOST,
    user: DB_USER,
    port:DB_PORT,
    password: DB_PASSWORD,
    database: DB_DATABASE
}
);

export default pool;