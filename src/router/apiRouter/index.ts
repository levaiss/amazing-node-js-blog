import { Router } from 'express';

import authRouter from './auth/index.ts';
import infoRouter from './info/index.ts';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/info', infoRouter);

export default apiRouter;
