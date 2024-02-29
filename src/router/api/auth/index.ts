// Core
import { Router } from 'express';

// Controllers
import { createUser, loginUser } from '../../../controllers/user-controller';

// Middleware
import { requestValidationMiddleware } from '../../../middleware/request-validation-middleware';

// Helpers
import { userLoginSchema, userRegistrationSchema } from '../../../validation/user-schema';

const router = Router();

router.post('/login', requestValidationMiddleware(userLoginSchema), loginUser);
router.post('/registration', requestValidationMiddleware(userRegistrationSchema), createUser);

export default router;
