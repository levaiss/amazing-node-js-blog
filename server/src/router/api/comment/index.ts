// Core
import { Router } from 'express';

// Controllers
import { createComment, deleteComment, getComments, updateComment } from '../../../controller/comment.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestBodyValidatorMiddleware, requestQueryValidatorMiddleware } from '../../../middleware/validator.middleware';

// Helpers
import { createCommentBodyValidator, getCommentsQueryValidator, updateCommentBodyValidator } from '../../../validator/comment.validator';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';
import { Roles } from '../../../config/roles.config';

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

/**
 * @swagger
 * /comment/{id}:
 *  patch:
 *    summary: Update comment by id
 *    tags: [Comment]
 *    description: Update comment by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 60f7b3b4b3e3e0001f000000
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - text
 *            properties:
 *              text:
 *                type: string
 *                description: Comment content
 *                example: Comment content
 *    responses:
 *      200:
 *        description: Comment updated
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Comment not found
 *      422:
 *        description: Unprocessable entity
 *      500:
 *        description: Internal server error
 */
router.patch('/:id', authHandlerMiddleware(), requestBodyValidatorMiddleware(updateCommentBodyValidator), updateComment);

/**
 * @swagger
 * /comment/{id}:
 *  delete:
 *    summary: Delete comment by id
 *    tags: [Comment]
 *    description: Delete comment by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 60f7b3b4b3e3e0001f000000
 *    responses:
 *     200:
 *       description: Comment deleted
 *     404:
 *      description: Comment not found
 *     401:
 *      description: Unauthorized
 *     403:
 *      description: Forbidden
 *     500:
 *      description: Internal server error
 */
router.delete('/:id', authHandlerMiddleware(), roleHandlerMiddleware(Roles.ADMIN), deleteComment);

export default router;
