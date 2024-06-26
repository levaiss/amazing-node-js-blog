// Core
import { Router } from 'express';

// Controllers
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../../../controller/post.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestBodyValidatorMiddleware, requestQueryValidatorMiddleware } from '../../../middleware/validator.middleware';

// Helpers
import { createPostBodyValidator, getPostsQueryValidator, updatePostBodyValidator } from '../../../validator/post.validator';
import { permissionHandlerMiddleware } from '../../../middleware/permission-handler.middleware';
import { PostPermissions } from '../../../config/roles.config';

const router = Router();

/**
 * @swagger
 * /post:
 *  get:
 *    summary: Get all posts
 *    tags: [Post]
 *    description: Get all posts
 *    parameters:
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
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *          description: Category name
 *        example: history
 *    responses:
 *      200:
 *        description: Get all posts
 *      500:
 *        description: Internal server error
 */
router.get('/', requestQueryValidatorMiddleware(getPostsQueryValidator), getAllPosts);

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: Get post by id
 *    tags: [Post]
 *    description: Get post by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: Post id
 *          example: 60f7b3b4b3e3e0001f000000
 *    responses:
 *      200:
 *        description: Get post by id
 *      404:
 *        description: Post not found
 *      500:
 *        description: Internal server error
 */
router.get('/:id', getPost);

/**
 * @swagger
 * /post:
 *  post:
 *    summary: Create a new post (editor and admin only)
 *    tags: [Post]
 *    description: Create a new post
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - body
 *            properties:
 *              title:
 *                type: string
 *                description: Post title
 *                example: Post title
 *                minLength: 3
 *              preview:
 *                type: url
 *                description: Post preview url
 *                example: https://example.com/image.jpg
 *              body:
 *                type: string
 *                description: Post content
 *                example: Post content
 *                minLength: 60
 *    responses:
 *      201:
 *        description: Post created
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      422:
 *        description: Unprocessable entity
 *      500:
 *        description: Internal server error
 */
router.post(
  '/',
  authHandlerMiddleware(),
  permissionHandlerMiddleware(PostPermissions.CREATE),
  requestBodyValidatorMiddleware(createPostBodyValidator),
  createPost,
);

/**
 * @swagger
 * /post/{id}:
 *  patch:
 *    summary: Update post by id (editor and admin only)
 *    tags: [Post]
 *    description: Update post by id
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
 *              - title
 *              - body
 *            properties:
 *              title:
 *                type: string
 *                description: Post title
 *                example: Post title
 *                minLength: 3
 *              preview:
 *                type: url
 *                description: Post preview url
 *                example: https://example.com/image.jpg
 *              body:
 *                type: string
 *                description: Post content
 *                example: Post content
 *                minLength: 60
 *    responses:
 *      200:
 *        description: Post updated
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Post not found
 *      422:
 *        description: Unprocessable entity
 *      500:
 *        description: Internal server error
 */
router.patch(
  '/:id',
  authHandlerMiddleware(),
  permissionHandlerMiddleware(PostPermissions.UPDATE),
  requestBodyValidatorMiddleware(updatePostBodyValidator),
  updatePost,
);

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    summary: Delete post by id (editor and admin only)
 *    tags: [Post]
 *    description: Delete post by id
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
 *       description: Post deleted
 *     404:
 *      description: Post not found
 *     401:
 *      description: Unauthorized
 *     403:
 *      description: Forbidden
 *     500:
 *      description: Internal server error
 */
router.delete('/:id', authHandlerMiddleware(), permissionHandlerMiddleware(PostPermissions.DELETE), deletePost);

export default router;
