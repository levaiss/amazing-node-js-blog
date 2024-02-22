import { Request, Response, Router } from 'express';
import uploadRouter from './upload';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('⚡️Welcome to Express Server!');
});
router.use('/upload', uploadRouter);

export default router;
