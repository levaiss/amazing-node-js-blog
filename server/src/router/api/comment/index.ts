// Core
import { Router } from 'express';

// Controllers
import { createComment, getComments } from '../../../controller/comment.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestBodyValidatorMiddleware, requestQueryValidatorMiddleware } from '../../../middleware/validator.middleware';

// Helpers
import { createCommentBodyValidator, getCommentsQueryValidator } from '../../../validator/comment.validator';

const router = Router();

/**
 * @swagger
 * paths:
 *   /comment:
 *     get:
 *      summary: Get all comments
 *      tags: [Comment]
 *      description: Get all comments
 *      produces:
 *        - application/json
 *      parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          description: Page number
 *        default: 1
 *        example: 1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          description: Number of items per page
 *        default: 5
 *        example: 5
 *      responses:
 *        200:
 *          description: Returns list of comments
 *        500:
 *          description: Internal server error
 */
router.get('/', requestQueryValidatorMiddleware(getCommentsQueryValidator), getComments);

/**
 * @swagger
 * paths:
 *   /comment:
 *    post:
 *      summary: Create a new comment
 *      tags: [Comment]
 *      security:
 *       - bearerAuth: []
 *      description: Create a new comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - text
 *                - post
 *              properties:
 *                text:
 *                  type: string
 *                  description: Comment content
 *                  example: This is a comment
 *                  required: true
 *                post:
 *                  type: string
 *                  description: Post ID
 *                  example: 60f3b3b3b3b3b3b3b3b3b3b3
 *                  required: true
 *      responses:
 *        201:
 *          description: Create a new comment
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbidden
 *        422:
 *          description: Unprocessable entity
 *        500:
 *          description: Internal server error
 */
router.post('/', authHandlerMiddleware(), requestBodyValidatorMiddleware(createCommentBodyValidator), createComment);

export default router;
