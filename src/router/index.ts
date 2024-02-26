import { Router } from 'express';
import apiRouter from './api';
import { requestLogger } from '../middleware/request-logger';
import { notFoundHandler } from '../middleware/not-found-handler';

const router = Router();

router.use(requestLogger);
router.use('/api', apiRouter);
router.use(notFoundHandler);

export default router;
