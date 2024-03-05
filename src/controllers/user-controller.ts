// Core
import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';

// Services
import AuthService from '../services/auth-service';

// Models
import { UserModel, TUser } from '../models/User';

// Helpers
import { BadRequestError } from '../errors';
import { RequestStatusCodes } from '../utils/request-status-codes';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { username, password, email } = req.body;

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return next(new BadRequestError('Username already exists'));
  }

  const hashedPassword = await AuthService.createHashedPassword(password);
  const user: HydratedDocument<TUser> = new UserModel({
    username,
    password: hashedPassword,
    email,
  });
  await user.save();

  const accessToken = AuthService.createAccessToken(user);
  const refreshToken = AuthService.createRefreshToken(user);

  res.status(RequestStatusCodes.Created).json({
    accessToken,
    refreshToken,
  });
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    return next(new BadRequestError('Username or password is incorrect'));
  }

  const isPasswordValid = AuthService.comparePassword(existingUser.password, password);
  if (!isPasswordValid) {
    return next(new BadRequestError('Username or password is incorrect'));
  }

  const accessToken = AuthService.createAccessToken(existingUser);
  const refreshToken = AuthService.createRefreshToken(existingUser);

  res.status(RequestStatusCodes.Success).json({
    accessToken,
    refreshToken,
  });
}

export function getUser(req: Request, res: Response) {
  const { user } = req;

  res.status(RequestStatusCodes.Success).json({
    user,
  });
}

export function updateRefreshToken(req: Request, res: Response) {
  const { user } = req;

  const accessToken = AuthService.createAccessToken(user as TUser);

  res.status(RequestStatusCodes.Success).json({
    accessToken,
  });
}
