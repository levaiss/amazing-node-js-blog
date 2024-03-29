// Core
import { Router } from 'express';

// Routes
import authRoute from './auth';
import userRouter from './user';
import postRouter from './post';
import commentRouter from './comment';
import analyticRouter from './analytic';
import categoryRouter from './category';

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

/**
 * @swagger
 * tags:
 *  name: Category
 */
router.use('/category', categoryRouter);

/**
 * @swagger
 * tags:
 *  name: Analytic
 */
router.use('/analytic', analyticRouter);

export default router;
