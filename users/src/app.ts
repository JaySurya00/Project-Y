import express from 'express';
import signupRouter from './router/signup';
import signinRouter from './router/signin';
import signoutRouter from './router/signout';
import currentUserRouter from './router/currentuser'
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@jaysuryaraj00/custom-middlewares';


const cors = require('cors');


const app = express();
app.use(cors());

app.use(cookieSession({
    signed: false,
    secure: false
}))
app.use(express.json());

app.use('/', signupRouter);
app.use('/', signinRouter);
app.use('/', signoutRouter);
app.use('/', currentUserRouter);

app.all('*', (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export default app;