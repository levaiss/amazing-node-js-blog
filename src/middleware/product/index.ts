import { Response, Request, NextFunction } from 'express';
import { ValidationError } from '../../utils/error-helper';

export function validCreateProductRequestParams(req: Request, res: Response, next: NextFunction) {
  const {name, price} = req.body;

  if (!name || !price) {
    next(new ValidationError('Name and price is required params'));
    return;
  }

  next();
}

export function validUpdateProductRequestParams(req: Request, res: Response, next: NextFunction) {
  const {name, price} = req.body;

  if (!name && !price) {
    next(new ValidationError('You can update name or price, this is required'));
    return;
  }

  next();
}