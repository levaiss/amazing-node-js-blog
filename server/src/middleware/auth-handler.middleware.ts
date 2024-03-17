// Core
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

// Services
import { IUserModel } from '../service/database/model/user.model';
import { AUTH_STRATEGIES_TYPE, AuthStrategiesType } from '../service/auth';

// Helpers
import { UnauthorizedError } from '../errors';

export function authHandlerMiddleware(strategyName: AuthStrategiesType = AUTH_STRATEGIES_TYPE.ACCESS_TOKEN) {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(strategyName, (error: Error, user: IUserModel) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return next(new UnauthorizedError());
      }
    })(req, res, next);
  };
}
