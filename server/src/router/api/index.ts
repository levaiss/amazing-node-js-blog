// Core
import { Router } from 'express';

// Routes
import authRoute from './auth';
import userRouter from './user';
import postRouter from './post';
import commentRouter from './comment';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 */
router.use('/auth', authRoute);
/**
 * @swagger
 * tags:
 *  name: User
 */
router.use('/user', userRouter);
/**
 * @swagger
 * tags:
 *  name: Post
 */
router.use('/post', postRouter);
/**
 * @swagger
 * tags:
 *  name: Comment
 */
router.use('/comment', commentRouter);

export default router;
