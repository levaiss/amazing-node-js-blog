// Core
import { Router } from 'express';

// Controllers
import { createComment, getComments } from '../../../controller/comment.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';

// Helpers
import { createCommentValidator } from '../../../validator/comment.validator';
import { Roles } from '../../../config/roles.config';

const router = Router();

router.post('/', authHandlerMiddleware(), requestValidationMiddleware(createCommentValidator), createComment);

router.get('/', authHandlerMiddleware(), roleHandlerMiddleware(Roles.ADMIN), getComments);

export default router;
