// Core
import { NextFunction, Request, Response } from 'express';

// Services
import AuthService from '../service/auth';
import MailService from '../service/mail';

// Models
import UserModel, { IUserModel } from '../service/database/model/user.model';

// Emails
import { getRegistrationEmail } from '../email/registration.email';

// Helpers
import { isAdmin } from '../config/roles.config';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';
import { RequestStatusCodes } from '../const/request-status-codes';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, email } = req.body;

    const user = new UserModel({
      username,
      password,
      email,
    });
    await user.save();

    const accessToken = AuthService.createAccessToken(user);
    const refreshToken = AuthService.createRefreshToken(user);

    const mailService = MailService.getInstance();
    mailService.sendMail(getRegistrationEmail(user));

    res.status(RequestStatusCodes.Created).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return next(new BadRequestError('Username or password is incorrect'));
    }

    const isPasswordValid = existingUser.validPassword(password);
    if (!isPasswordValid) {
      return next(new BadRequestError('Username or password is incorrect'));
    }

    const accessToken = AuthService.createAccessToken(existingUser);
    const refreshToken = AuthService.createRefreshToken(existingUser);

    res.status(RequestStatusCodes.Success).json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    next(e);
  }
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserModel.find({});

    res.status(RequestStatusCodes.Success).json({
      users,
    });
  } catch (e) {
    next(e);
  }
}

export function getUser(req: Request, res: Response) {
  const { user } = req;

  res.status(RequestStatusCodes.Success).json({
    user,
  });
}

export function updateRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUserModel;

    const accessToken = AuthService.createAccessToken(user);

    res.status(RequestStatusCodes.Success).json({
      accessToken,
    });
  } catch (e) {
    next(e);
  }
}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
  const {
    params: { id },
    body,
  } = req;

  const user = await UserModel.findById(id);
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  const currentUser = req.user as IUserModel;
  if (!(isAdmin(currentUser.role) || user.isSameUser(currentUser))) {
    return next(new ForbiddenError());
  }

  user.set(body);
  const updateUser = await user.save();

  res.json({ user: updateUser });
}

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  const {
    params: { id },
    body,
  } = req;

  const user = await UserModel.findById(id);
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  user.role = body.role;
  const updateUser = await user.save();

  res.json({ user: updateUser });
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const {
    params: { id },
  } = req;

  const user = await UserModel.findById(id);
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  await UserModel.deleteOne({ _id: id });

  res.status(RequestStatusCodes.Success).json({
    message: 'User successfully deleted',
  });
}
