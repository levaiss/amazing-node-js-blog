// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser, updateRefreshToken } from '../../../controllers/user-controller';

// Middleware
import { requestValidationMiddleware } from '../../../middleware/request-validation-middleware';

// Helpers
import { userLoginSchema, userRegistrationSchema, refreshTokenSchema } from '../../../validation/user-schema';

const router = Router();

router.post('/login', requestValidationMiddleware(userLoginSchema), loginUser);
router.post('/registration', requestValidationMiddleware(userRegistrationSchema), createUser);
router.post('/refresh-token', requestValidationMiddleware(refreshTokenSchema), updateRefreshToken);

export default router;
