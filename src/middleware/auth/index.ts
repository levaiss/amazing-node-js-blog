import { Response, Request, NextFunction } from 'express';
import { UnauthorizedError, ValidationError } from '../../utils/error-helper';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers['authorization'];
  if (!authToken || authToken !== 'Bearer 1234') {
    next(new UnauthorizedError());
    return;
  }

  next();
}

export function validLoginRequestParams(req: Request, res: Response, next: NextFunction) {
  const {login, password} = req.body;

  if (!login || !password) {
    next(new ValidationError('Login and password is required params'));
    return;
  }

  next();
}

export function validRegistrationRequestParams(req: Request, res: Response, next: NextFunction) {
  const {login, password, name} = req.body;

  if (!login || !password || !name) {
    next(new ValidationError('Login, password and name is required params'));
    return;
  }

  const modifiedPassword = password.toString().trim();
  if (modifiedPassword.length < 8) {
    next(new ValidationError('Password length must be more than 8 characters'));
    return;
  }

  next();
}