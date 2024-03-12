// Core
import { Router } from 'express';

// Controllers
import { getUser } from '../../../controller/user.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';

const router = Router();

router.use(authHandlerMiddleware());

router.get('/me', getUser);

export default router;
