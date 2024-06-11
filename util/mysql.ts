import mysql from 'mysql2'
import { env } from '../src/config/config';

const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWD,
    database: env.MYSQL_DATABASE,
    connectionLimit: 10,
});

export const insertData = (table_name: string, data: {}) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Connect database error: ", err.stack);
            return;
        }

        console.log("Connected to database");
        
        connection.query(`INSERT INTO ${table_name} SET ?`, data, (err, result, fields) => {
            connection.release();
            if (err) {
                console.error("Insert error: ", err.message);
                return;
            }
            console.log("Insert success");
            
        })
    });
}
