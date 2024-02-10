import { Router, Request, Response } from 'express';
import { createUser, getAllUsers } from '../../../controllers/userController.ts';
import { RequestStatusCodes } from '../../../utils/request-status-codes.ts';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(RequestStatusCodes.Success).json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const {login, password} = req.body;
  if (!login || !password) {
    res.status(RequestStatusCodes.Validation).json({
      message: 'Login and password is required fields!'
    });
    return;
  }

  const newUser = await createUser({login, password});
  res.status(200).json(newUser);
});

export default usersRouter;
