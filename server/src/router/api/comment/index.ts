// Core
import { Router } from 'express';

// Controllers
import { createComment } from '../../../controller/comment.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';

// Helpers
import { createCommentValidator } from '../../../validator/comment.validator';

const router = Router();

router.post('/', authHandlerMiddleware(), requestValidationMiddleware(createCommentValidator), createComment);

export default router;
