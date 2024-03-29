// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser, updateRefreshToken } from '../../../controller/user.controller';

// Services
import { AUTH_STRATEGIES_TYPE } from '../../../service/auth';

// Middleware
import { requestBodyValidatorMiddleware } from '../../../middleware/validator.middleware';
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';

// Helpers
import { userLoginBodyValidator, userRegistrationBodyValidator } from '../../../validator/user.validator';

const router = Router();

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *      summary: Login user
 *      tags: [Auth]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 password:
 *                   type: string
 *                   description: User's password
 *      responses:
 *        200:
 *          description: Return access and refresh tokens
 *        400:
 *          description: Bad request
 *        422:
 *          description: Validation error
 *        500:
 *          description: Internal server error
 */
router.post('/login', requestBodyValidatorMiddleware(userLoginBodyValidator), loginUser);

/**
 * @swagger
 * paths:
 *  /auth/registration:
 *    post:
 *      summary: Registration user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  description: User's username
 *                password:
 *                  type: string
 *                  description: User's password
 *      responses:
 *        200:
 *          description: Return access and refresh tokens
 *        400:
 *          description: Bad request
 *        422:
 *          description: Validation error
 *        500:
 *          description: Internal server error
 */
router.post('/registration', requestBodyValidatorMiddleware(userRegistrationBodyValidator), createUser);

/**
 * @swagger
 * paths:
 *  /auth/refresh-token:
 *    post:
 *      summary: Refresh token
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  description: User's refresh token
 *      responses:
 *        200:
 *          description: Return access and refresh tokens
 *        400:
 *          description: Bad request
 *        422:
 *          description: Validation error
 *        500:
 *          description: Internal server error
 */
router.post('/refresh-token', authHandlerMiddleware(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN), updateRefreshToken);

export default router;
