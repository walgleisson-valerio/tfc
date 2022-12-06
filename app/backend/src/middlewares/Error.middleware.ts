import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.util';

export default class ErrorMiddleware {
  static handler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { status, message } = error as HttpException;

    return res.status(status || 500).json({ message } || 'Unknown Error');
  }
}
