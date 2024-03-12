// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser, updateRefreshToken } from '../../../controller/user.controller';

// Services
import { AUTH_STRATEGIES_TYPE } from '../../../service/auth.service';

// Middleware
import { requestValidationMiddleware } from '../../../middleware/request-validation.middleware';
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';

// Helpers
import { userLoginValidator, userRegistrationValidator } from '../../../validator/user.validator';

const router = Router();

router.post('/login', requestValidationMiddleware(userLoginValidator), loginUser);

router.post('/registration', requestValidationMiddleware(userRegistrationValidator), createUser);

router.post('/refresh-token', authHandlerMiddleware(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN), updateRefreshToken);

export default router;
