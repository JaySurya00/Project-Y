import express from 'express';
import signupRouter from './router/signup';
import signinRouter from './router/signin';
import signoutRouter from './router/signout';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@jaysuryaraj00/custom-middlewares';

const app= express();
app.use(cookieSession({
    signed: false,
    secure: false
}))
app.use(express.json());

app.use('/',signupRouter);
app.use('/',signinRouter);
app.use('/',signoutRouter);

app.all('*',(req, res)=>{
    throw new NotFoundError();
})
app.use(errorHandler);

export default app;