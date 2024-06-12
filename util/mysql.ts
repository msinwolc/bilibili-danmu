import mysql from 'mysql2/promise'
import { env } from '../src/config/config';

const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWD,
    database: env.MYSQL_DATABASE,
    connectionLimit: 151,
});

export const insertData = async (table_name: string, data: Object) => {
    try {
        const connection = await pool.getConnection();
        try {
            const query = `INSERT INTO ?? SET ?`;
            await connection.query(query, [table_name, data]);
        } catch (err) {
            const error = err as Error;
            console.error("Insert data error: ", error.message);
        } finally {
            connection.release();
        }
    } catch (err) {
        const error = err as Error;
        console.error("Connect database error: ", error.stack);
    }
};

export const insertDataBatch = async (table_name: string, data: any[]) => {
    try {
        const connection = await pool.getConnection();
        try {
            const columns = Object.keys(data[0]);
            const values = data.map(Object.values);

            const placeholders = values.map(row => `(${row.map(() => '?').join(',')})`).join(',');
            const query = `INSERT INTO ${table_name} (${columns.join(',')}) VALUES ${placeholders}`;

            const flatValues = values.reduce((acc, val) => acc.concat(val), []);
            await connection.query(query, flatValues);
        } catch (err) {
            const error = err as Error;
            console.error("Insert data error: ", error.message);
        } finally {
            connection.release();
        }
    } catch (err) {
        const error = err as Error;
        console.error("Connect database error: ", error.stack);
    }
};
