import mysql, { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DBConnection } from '../DB/users_db';
import User from '../models/users';

interface IUserRepository {
    getAll(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User, id: number): Promise<User>;
    deleteUser(id: number): Promise<User | null>;
}

class UserRepository implements IUserRepository {

    constructor() { };
    async getAll(): Promise<User[]> {
        const connection: PoolConnection = await DBConnection();
        const queryResult = await connection.query<RowDataPacket[]>('SELECT * FROM users', []);
        const [rows, fields] = queryResult;
        const users: User[] = rows as User[];
        if (connection) {
            connection.release();
        }
        return users;
    }

    async getUserById(id: number): Promise<User | null> {
        const connection: PoolConnection = await DBConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id]);
        if (connection) {
            connection.release();
        }
        return rows.length ? rows[0] as User : null;
    }

    async getUser(user: Partial<User>): Promise<User | null> {
        const connection: PoolConnection = await DBConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE username=? AND password=?', [user.username, user.password]);
        if (connection) {
            connection.release();
        }
        return rows.length ? rows[0] as User : null;
    }

    async getUserWithEmail(user: Partial<User>): Promise<User | null> {
        const connection: PoolConnection = await DBConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE email=?', [user.email]);
        if (connection) {
            connection.release();
        }
        return rows.length ? rows[0] as User : null;
    }

    async getUserWithUsername(user: Partial<User>): Promise<User | null> {
        const connection: PoolConnection = await DBConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE username=?', [user.username]);
        if (connection) {
            connection.release();
        }
        return rows.length ? rows[0] as User : null;
    }

    async createUser(user: Partial<User>): Promise<User> {
        const connection: PoolConnection = await DBConnection();
        const [result] = await connection.execute<ResultSetHeader>('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', [user.first_name, user.last_name, user.username, user.email, user.password]);
        const userId = result.insertId;
        const newUser = await this.getUserById(userId);
        if (connection) {
            connection.release();
        }
        return newUser!;
    }
    async updateUser(user: User, id: number): Promise<User> {
        const connection: PoolConnection = await DBConnection();
        await connection.execute<ResultSetHeader>('UPDATE users SET first_name=?, last_name=?, username=?, email=?, password=? WHERE id=?', [user.first_name, user.last_name, user.username, user.email, user.password, id]);
        const updateUser = await this.getUserById(id);
        if (connection) {
            connection.release();
        }
        return updateUser!;
    }
    async deleteUser(id: number): Promise<User | null> {
        const connection: PoolConnection = await DBConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            // No row found with the given ID
            return null;
        }
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        if (connection) {
            connection.release();
        }
        if (result.affectedRows > 0) {
            // Return the deleted row
            return rows[0] as User;
        } else {
            // Row was not deleted (possible issue)
            return null;
        }
    }
}

const users = new UserRepository();

export default users;