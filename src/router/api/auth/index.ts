import { Request, Response, Router } from 'express';
import { validLoginRequestParams, validRegistrationRequestParams } from '../../../middleware/auth';

const router = Router();

router.get('/login', validLoginRequestParams, (req: Request, res: Response) => {
  res.json({
    token: '1234'
  });
});

router.post('/registration', validRegistrationRequestParams, (req: Request, res: Response) => {
  res.json({
    token: '1234'
  });
});

export default router;
