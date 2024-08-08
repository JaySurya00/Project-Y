import { DatabaseConnectionError } from '@jaysuryaraj00/custom-middlewares';
import mysql, { PoolConnection, PoolOptions, Pool } from 'mysql2/promise';

const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

let connection: PoolConnection | null = null;

async function DBConnection() {
    if (connection) {
        return connection;
    }
    try {
        const pool: Pool = mysql.createPool(access);
        connection = await pool.getConnection();
        const tableSql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;
        await pool.query(tableSql,[]);
        console.log('Connected to MYSQL');
        return connection;
    }
    catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    }
}

export { DBConnection };