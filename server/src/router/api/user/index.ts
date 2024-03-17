// Core
import { Router } from 'express';

// Controllers
import { getUser, updateUserProfile, updateUserRole } from '../../../controller/user.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';

// Helpers
import { Roles } from '../../../config/roles.config';
import { userRoleValidator, userProfileValidator } from '../../../validator/user.validator';

const router = Router();

router.get('/me', authHandlerMiddleware(), getUser);

router.patch('/:id', authHandlerMiddleware(), requestValidationMiddleware(userProfileValidator), updateUserProfile);

router.patch(
  '/:id/role',
  authHandlerMiddleware(),
  roleHandlerMiddleware(Roles.ADMIN),
  requestValidationMiddleware(userRoleValidator),
  updateUserRole,
);

export default router;
