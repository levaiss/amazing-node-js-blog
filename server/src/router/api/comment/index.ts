// Core
import { Router } from 'express';

// Controllers
import { createComment, getComments } from '../../../controller/comment.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';

// Helpers
import { createCommentValidator } from '../../../validator/comment.validator';

const router = Router();

/**
 * @swagger
 * paths:
 *   /comment:
 *     get:
 *      tags: [Comment]
 *      responses:
 *        200:
 *          description: Returns list of comments
 */
router.get('/', getComments);

/**
 * @swagger
 * paths:
 *   /comment:
 *    post:
 *      tags: [Comment]
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        201:
 *          description: Create a new comment
 */
router.post('/', authHandlerMiddleware(), requestValidationMiddleware(createCommentValidator), createComment);

export default router;
