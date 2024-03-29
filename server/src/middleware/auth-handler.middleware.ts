// Core
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

// Services
import { IUserModel } from '../service/database/model/user.model';
import { AUTH_STRATEGIES_TYPE, AuthStrategiesType } from '../service/auth';

// Helpers
import { UnauthorizedError } from '../errors';

export const authHandlerMiddleware =
  (strategyName: AuthStrategiesType = AUTH_STRATEGIES_TYPE.ACCESS_TOKEN) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(strategyName, (error: Error, user: IUserModel) => {
      if (error || !user) {
        return next(error || new UnauthorizedError());
      }
      req.user = user;
      next();
    })(req, res, next);
