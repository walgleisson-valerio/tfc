import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.util';
import Jwt from '../utils/Jwt.util';

export default class AuthMiddleware {
  static validateToken(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(401, 'Token not found');
    }

    try {
      const userDecoded = Jwt.validateToken(authorization as string);

      req.body.user = userDecoded;
    } catch (e) {
      throw new HttpException(401, 'Token must be a valid token');
    }

    next();
  }
}
