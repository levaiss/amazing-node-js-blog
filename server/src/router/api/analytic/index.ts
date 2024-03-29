// Core
import { Router } from 'express';

// Controllers
import { getSummaryStatistic } from '../../../controller/analytic.controller';

// Middlewares
import { authHandlerMiddleware } from '../../../middleware/auth-handler.middleware';
import { roleHandlerMiddleware } from '../../../middleware/role-handler.middleware';

// Helpers
import { Roles } from '../../../config/roles.config';

const router = Router();

/**
 * @swagger
 * paths:
 *   /analytic/summary-statistic:
 *     get:
 *      summary: Get summary statistic (Admin only)
 *      tags: [Analytic]
 *      description: Get summary statistic
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Return summary statistic
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal server error
 */
router.get('/summary-statistic', authHandlerMiddleware(), roleHandlerMiddleware(Roles.ADMIN), getSummaryStatistic);

export default router;
