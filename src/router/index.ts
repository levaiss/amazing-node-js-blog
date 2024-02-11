import { Request, Response, Router } from 'express';

import apiRouter from './apiRouter/index.ts';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('⚡️Welcome to Express Server!');
});
router.use('/api', apiRouter);

export default router;
