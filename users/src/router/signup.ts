import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import users from "../CRUD/userRepository";
import { validateRequest, BadRequestError } from "@jaysuryaraj00/custom-middlewares";
import { decodeToken, generateToken } from "../JWT/token";
import User from "../models/users";

const router= Router();


router.post('/api/users/signup',[
    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name cannot be empty'),
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name cannot be empty'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username cannot be empty'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
],validateRequest, async (req:Request, res:Response, next: NextFunction)=>{
    const userData: Partial<User>= req.body;
    const existingUserWithEmail= await users.getUserWithEmail({email:userData.email});
    const existingUserWithUsername= await users.getUserWithUsername({username: userData.username});
    if(existingUserWithUsername){
        next(new BadRequestError('Username already in username.'));
        return;
    }
    if(existingUserWithEmail){
        next(new BadRequestError('Email already in user.'));
        return;
    }
    const user= await users.createUser(userData) as User;
    const token= generateToken({id:user.id, username:user.username});
    req.session={
        jwt: token
    }
    res.status(201).send(user);
})

export default router;
