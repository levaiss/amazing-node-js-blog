import { Router } from 'express';
import authRouter from './auth/index.ts';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;
