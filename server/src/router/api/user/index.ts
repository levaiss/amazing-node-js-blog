// Core
import { Router } from 'express';

// Controllers
import { createUser, deleteUser, getAllUsers, getUser, updateUserProfile, updateUserRole } from '../../../controller/user.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';
import { requestBodyValidatorMiddleware } from '../../../middleware/validator.middleware';

// Helpers
import { Roles, UserPermissions } from '../../../config/roles.config';
import { userProfileBodyValidator, userRegistrationBodyValidator, userRoleBodyValidator } from '../../../validator/user.validator';
import { permissionHandlerMiddleware } from '../../../middleware/permission-handler.middleware';

const router = Router();

/**
 * @swagger
 * /user/profile:
 *  get:
 *    summary: Get user profile
 *    description: Get user profile
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get user profile
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal Server Error
 */
router.get('/profile', authHandlerMiddleware(), getUser);

// TODO: self posts and comments

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Get all users (Admin only)
 *    description: Get all users
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get all users
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Internal Server Error
 */
router.get('/', authHandlerMiddleware(), roleHandlerMiddleware(Roles.ADMIN), getAllUsers);

/**
 * @swagger
 * /user:
 *  post:
 *    summary: Create user (Admin only)
 *    description: Create user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - email
 *            properties:
 *              username:
 *                type: string
 *                description: User name
 *                example: John Doe
 *                minLength: 3
 *                maxLength: 24
 *              password:
 *                type: string
 *                description: User password
 *                example: password
 *                minLength: 6
 *                maxLength: 50
 *              email:
 *                type: string
 *                description: User email
 *                example: john@dou.com
 *    responses:
 *      200:
 *        description: User created
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
  roleHandlerMiddleware(Roles.ADMIN),
  requestBodyValidatorMiddleware(userRegistrationBodyValidator),
  createUser,
);

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update user profile by id
 *    description: Update user profile by id
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 123e4567-e89b-12d3-a456-426614174000
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *            properties:
 *              username:
 *                type: string
 *                description: User name
 *                example: John Doe
 *                minLength: 3
 *                maxLength: 24
 *              email:
 *                type: string
 *                description: User email
 *                example: john@dou.com
 *              avatar:
 *                type: url
 *                description: User avatar
 *                example: https://example.com/image.jpg
 *    responses:
 *      200:
 *        description: User profile updated
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
router.patch('/:id', authHandlerMiddleware(), requestBodyValidatorMiddleware(userProfileBodyValidator), updateUserProfile);

/**
 * @swagger
 * /user/{id}/role:
 *  patch:
 *    summary: Update user role by id (Admin only)
 *    tags: [User]
 *    description: Update user role by id (3 - User, 2 - Editor)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 123e4567-e89b-12d3-a456-426614174000
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - role
 *            properties:
 *              role:
 *                type: number
 *                description: User role
 *                example: 2
 *    responses:
 *      200:
 *        description: User role updated
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
router.patch(
  '/:id/role',
  authHandlerMiddleware(),
  permissionHandlerMiddleware(UserPermissions.UPDATE_ROLE),
  requestBodyValidatorMiddleware(userRoleBodyValidator),
  updateUserRole,
);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Delete user by id (Admin only)
 *    tags: [User]
 *    description: Delete user by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 123e4567-e89b-12d3-a456-426614174000
 *          description: User id
 *    responses:
 *      200:
 *        description: User deleted
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
router.delete('/:id', authHandlerMiddleware(), permissionHandlerMiddleware(UserPermissions.DELETE), deleteUser);

export default router;
