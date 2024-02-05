import { Router, Request, Response } from 'express';
import { authenticateUser } from '../../../controllers/authController.ts';
import { RequestStatusCodes } from '../../../utils/request-status-codes.ts';
import { CustomError } from '../../../utils/error-handler.ts';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userInfo = await authenticateUser(username, password);
    res.status(RequestStatusCodes.Success).json(userInfo);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      const { code, message, data = {} } = error;
      return res.status(code).json({
        message,
        data,
      });
    } else {
      return res.status(RequestStatusCodes.BadRequest).json({
        message: 'Something went wrong!',
      });
    }
  }
});

export default authRouter;
