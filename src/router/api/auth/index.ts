// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser, updateRefreshToken } from '../../../controller/user.controller';

// Middleware
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';

// Helpers
import { userLoginSchema, userRegistrationSchema } from '../../../schema/user.schema';
import { AUTH_STRATEGIES_TYPE } from '../../../services/auth.service';

const router = Router();

router.post('/login', requestValidationMiddleware(userLoginSchema), loginUser);

router.post('/registration', requestValidationMiddleware(userRegistrationSchema), createUser);

router.post('/refresh-token', authHandlerMiddleware(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN), updateRefreshToken);

export default router;
