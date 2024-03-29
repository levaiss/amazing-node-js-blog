// Core
import { Router } from 'express';

// Controllers
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../../controller/category.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';

// Helpers
import { Roles } from '../../../config/roles.config';
import { requestBodyValidatorMiddleware } from '../../../middleware/validator.middleware';
import { createCategoryBodyValidator } from '../../../validator/category.validator';

const router = Router();

/**
 * @swagger
 * /category:
 *  get:
 *    summary: Get all categories
 *    tags: [Category]
 *    description: Get all categories
 *    responses:
 *      200:
 *        description: Categories found
 *      500:
 *        description: Internal server error
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /category:
 *  post:
 *    summary: Create a new category (ADMIN only)
 *    tags: [Category]
 *    description: Create a new category
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                description: Category name
 *                example: History
 *                minLength: 3
 *    responses:
 *      201:
 *        description: Category created
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
  requestBodyValidatorMiddleware(createCategoryBodyValidator),
  createCategory,
);

/**
 * @swagger
 * /category/{id}:
 *  patch:
 *    summary: Update category by id (ADMIN only)
 *    tags: [Category]
 *    description: Update category by id
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
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                description: Category name
 *                example: History
 *                minLength: 3
 *    responses:
 *      200:
 *        description: Category updated
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Category not found
 *      422:
 *        description: Unprocessable entity
 *      500:
 *        description: Internal server error
 */
router.patch(
  '/:id',
  authHandlerMiddleware(),
  roleHandlerMiddleware(Roles.ADMIN),
  requestBodyValidatorMiddleware(createCategoryBodyValidator),
  updateCategory,
);

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *    summary: Delete category by id (ADMIN only)
 *    tags: [Category]
 *    description: Delete category by id
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
 *       description: Category deleted
 *     404:
 *      description: Category not found
 *     401:
 *      description: Unauthorized
 *     403:
 *      description: Forbidden
 *     500:
 *      description: Internal server error
 */
router.delete('/:id', authHandlerMiddleware(), roleHandlerMiddleware(Roles.ADMIN), deleteCategory);

export default router;
