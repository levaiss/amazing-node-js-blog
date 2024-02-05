import { Router } from 'express';
import apiRouter from './apiRouter/index.ts';

const router = Router();

router.use('/api', apiRouter);

export default router;
