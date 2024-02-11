import { Router } from 'express';
import usersRouter from './users/index.ts';
import filesRoute from './files/index.ts';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/files', filesRoute);

export default apiRouter;
