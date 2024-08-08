import * as jwt from 'jsonwebtoken';
import User from '../models/users';

interface UserData {
    id: number;
    username: string;
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