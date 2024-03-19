// Core
import { Router } from 'express';

// Controllers
import { getPosts, getPost, createPost, updatePost, deletePost } from '../../../controller/post.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';

// Helpers
import { createPostValidator, updatePostValidator } from '../../../validator/post.validator';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', authHandlerMiddleware(), requestValidationMiddleware(createPostValidator), createPost);

router.patch('/:id', authHandlerMiddleware(), requestValidationMiddleware(updatePostValidator), updatePost);

router.delete('/:id', authHandlerMiddleware(), deletePost);

export default router;
