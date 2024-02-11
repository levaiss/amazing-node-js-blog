import { Router, Request, Response } from 'express';
import { createUser, getAllUsers } from '../../../controllers/userController.ts';
import { RequestStatusCodes } from '../../../utils/request-status-codes.ts';
import { CustomError, ValidationError } from '../../../utils/error-halper.ts';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(RequestStatusCodes.Success).json(users);
  } catch (e) {
    res.status(RequestStatusCodes.InternalServerError).json({
      message: 'Something went wrong!'
    });
  }
});

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {login, password} = req.body;
    if (!login || !password) {
      throw new ValidationError('Login and password is required fields.')
    }

    const newUser = await createUser({login, password});
    res.status(RequestStatusCodes.Success).json(newUser);
  } catch (e) {
    if (e instanceof CustomError) {
      const {code, message} = e;
      res.status(code).json({
        message
      });
    } else {
      res.status(RequestStatusCodes.InternalServerError).json({
        message: 'Something went wrong!'
      });
    }
  }
});

export default usersRouter;
