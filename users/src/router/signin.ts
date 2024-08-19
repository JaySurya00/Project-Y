import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import users from "../CRUD/userRepository";
import { validateRequest, BadRequestError } from "@jaysuryaraj00/custom-middlewares";
import { generateToken } from "../JWT/token";
import User from "../models/users";

const router = Router();
router.post('/api/users/signin', [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username cannot be empty'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
], validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await users.getUser({ username, password }) as User;
    if (!user) {
        next(new BadRequestError('Invalid Credentials'));
        return;
    }
    const token = generateToken({ id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email });
    req.session = {
        jwt: token
    }
    res.status(200).send(user);
})

export default router;
