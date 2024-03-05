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

  const user = await new User({
    username,
    password,
    email
  } as IUser).save();

  const accessToken = AuthService.createAccessToken(user.username, user.id);
  const refreshToken = AuthService.createRefreshToken(user.username, user.id);

  res.status(RequestStatusCodes.Created).json({
    accessToken,
    refreshToken
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

  const accessToken = AuthService.createAccessToken(existingUser.username, existingUser.id);
  const refreshToken = AuthService.createRefreshToken(existingUser.username, existingUser.id);

  res.status(RequestStatusCodes.Success).json({
    accessToken,
    refreshToken
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

export function updateRefreshToken(req: Request, res: Response) {
  const { user } = req;

  const { username, id} = user as IUser;

  const accessToken = AuthService.createAccessToken(username, id);

  res.status(RequestStatusCodes.Success).json({
    accessToken,
  });
}