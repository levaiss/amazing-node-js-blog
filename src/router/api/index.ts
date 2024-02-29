import { Router } from 'express';
import authRoute from './auth';
import userRouter from './user';

const router = Router();

router.use('/auth', authRoute);
router.use('/user', userRouter);

export default router;
