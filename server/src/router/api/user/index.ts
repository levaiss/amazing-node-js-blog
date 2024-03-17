// Core
import { Router } from 'express';

// Controllers
import { getUser, updateUserRole } from '../../../controller/user.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';

// Helpers
import { Roles } from '../../../config/roles.config';
import { userRoleValidator } from '../../../validator/user.validator';

const router = Router();

router.use(authHandlerMiddleware());

router.get('/me', getUser);

router.patch('/:id/role', roleHandlerMiddleware(Roles.ADMIN), requestValidationMiddleware(userRoleValidator), updateUserRole);

export default router;
