// Core
import { Router } from 'express';

// Routes
import authRoute from './auth';
import userRouter from './user';
import postRouter from './post';
import commentRouter from './comment';

const router = Router();

router.use('/auth', authRoute);
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

export default router;
