import * as jwt from 'jsonwebtoken';
import User from '../models/users';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email:string
}

function generateToken(userData: UserData): string {
    const token = jwt.sign(userData, 'muskansinghvi');
    return token;
}

function decodeToken(token:string): UserData{
    const data= jwt.verify(token, 'muskansinghvi');
    return data as UserData;
}

export {generateToken, decodeToken};