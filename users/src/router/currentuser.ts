import { Router } from "express";
import { currentUser } from "@jaysuryaraj00/custom-middlewares";
import { Request, Response } from "express";

const router= Router();


router.get('/api/users/currentuser', currentUser, async (req:Request, res:Response)=>{
    res.send({currentUser: req.session});
})

export default router