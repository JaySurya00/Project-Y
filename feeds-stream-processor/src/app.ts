import express from "express";
import { NotFoundError, errorHandler } from '@jaysuryaraj00/custom-middlewares';

const app= express();


app.all('*',(req, res)=>{
    throw new NotFoundError();
})
app.use(errorHandler);

export default app;