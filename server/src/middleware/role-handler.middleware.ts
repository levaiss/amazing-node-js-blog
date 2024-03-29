// Core
import { NextFunction, Request, Response } from 'express';

// Models
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { Roles } from '../config/roles.config';
import { ForbiddenError } from '../errors';

export function roleHandlerMiddleware(allowedRole: Roles | Roles[]) {
  const allowedRoles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUserModel;
    const isRoleValid = allowedRoles.includes(user.role);
    if (!isRoleValid) {
      next(new ForbiddenError());
    }

    next();
  };
}
