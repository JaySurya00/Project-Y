import { Router } from "express";
import { NotAuthorizedError } from "@jaysuryaraj00/custom-middlewares";
import { Request, Response } from "express";
import { decodeToken } from "../JWT/token";

const router= Router();


router.get('/api/users/currentuser', async (req:Request, res:Response, next)=>{
    if(!req.session?.jwt){
        next(new NotAuthorizedError());
        return;
    }
    const token= req.session.jwt;
    const user= decodeToken(token);
    res.send({currentUser: user});
})

export default router