import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).json({ error: 'Authorization not provided' });
    else if (authorization === '123') {
      next();
    } else {
      res.status(403).json({ error: 'Not a valid user' });
    }
  }
}
