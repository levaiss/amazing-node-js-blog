import { Router } from 'express';
import apiRouter from './api';

const router = Router();

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.use('/api', apiRouter);

export default router;
