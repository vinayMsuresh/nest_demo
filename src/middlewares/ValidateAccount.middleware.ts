import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ValidateCustomer implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    if (!valid) {
      return res.status(403).send({ error: 'Not a valid user' });
    }
    next();
  }
}