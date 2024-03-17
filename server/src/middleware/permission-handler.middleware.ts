// Core
import { NextFunction, Request, Response } from 'express';

// Models
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { rolesConfig, RolePermission } from '../config/roles.config';
import { ForbiddenError } from '../errors';

export function permissionHandlerMiddleware(permission: RolePermission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUserModel;
    const roleConfig = rolesConfig.find(({ role }) => role === user.role);
    const isPermissionValid = roleConfig?.permissions.includes(permission);
    if (!isPermissionValid) {
      next(new ForbiddenError());
    }

    next();
  };
}
