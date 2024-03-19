// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser, updateRefreshToken } from '../../../controller/user.controller';

// Services
import { AUTH_STRATEGIES_TYPE } from '../../../service/auth';

// Middleware
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';

// Helpers
import { userLoginValidator, userRegistrationValidator } from '../../../validator/user.validator';

const router = Router();

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
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
 */
router.post('/login', requestValidationMiddleware(userLoginValidator), loginUser);

router.post('/registration', requestValidationMiddleware(userRegistrationValidator), createUser);

router.post('/refresh-token', authHandlerMiddleware(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN), updateRefreshToken);

export default router;
