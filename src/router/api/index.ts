import { Router } from 'express';
import authRoute from './auth';
import productRoute from './product';

const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);

export default router;
