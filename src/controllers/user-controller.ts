import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/User';
import { BadRequestError } from '../errors';
import { RequestStatusCodes } from '../utils/request-status-codes';
import AuthService from '../services/auth-service';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { username, password, email } = req.body;

  const existingUser = await User.getByUsername(username);
  if (existingUser) {
    return next(new BadRequestError('Username already exists'));
  }

  const hashedPassword = await AuthService.createHashedPassword(password);

  await new User({
    username,
    password: hashedPassword,
    email
  } as IUser).save();

  res.status(RequestStatusCodes.Created).json({
    message: 'User successfully created!'
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

  res.status(RequestStatusCodes.Success).json({
    message: 'The user is successfully authorized',
    token: '1234'
  });
}