import { Request, Response, Router } from 'express';

const router = Router();

router.get('/signup', (req: Request, res: Response) => {
  res.json({
    token: '1234'
  });
});

export default router;
