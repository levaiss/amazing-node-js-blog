import { Router } from 'express';
import usersRouter from './users/index';
import filesRoute from './files/index';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/files', filesRoute);

export default apiRouter;
