// Core
import { NextFunction, Request, Response } from 'express';

// Services
import AuthService from '../services/auth-service';

// Models
import { IUser, User } from '../models/User';

// Helpers
import { BadRequestError } from '../errors';
import { RequestStatusCodes } from '../utils/request-status-codes';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { username, password, email } = req.body;

  const existingUser = await User.getByUsername(username);
  if (existingUser) {
    return next(new BadRequestError('Username already exists'));
  }

  const hashedPassword = await AuthService.createHashedPassword(password);

  const user = await new User({
    username,
    password: hashedPassword,
    email
  } as IUser).save();

  const token = AuthService.createJwtToken(user.username, user.id);

  res.status(RequestStatusCodes.Created).json({
    token
  });
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const existingUser = await User.getByUsername(username);
  if (!existingUser) {
    return next(new BadRequestError('Username or password is incorrect'));
  }

  const isPasswordValid = AuthService.comparePassword(existingUser.password, password);
  if (!isPasswordValid) {
    return next(new BadRequestError('Username or password is incorrect'));
  }

  const token = AuthService.createJwtToken(existingUser.username, existingUser.id);

  res.status(RequestStatusCodes.Success).json({
    token
  });
}

export function getUser(req: Request, res: Response) {
  const { user } = req;

  const {username, email, id} = user as IUser;

  res
    .status(RequestStatusCodes.Success)
    .json({
      user: {
        username,
        email,
        id,
      }
    });
}