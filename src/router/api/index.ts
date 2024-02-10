import { Router } from 'express';
import usersRouter from './users/index.ts';

const apiRouter = Router();

apiRouter.use('/users', usersRouter)

export default apiRouter;
