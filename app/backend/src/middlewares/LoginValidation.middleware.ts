import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.util';

export default class LoginValidation {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email) || password.length < 6) {
      throw new HttpException(400, 'Incorrect email or password');
    }

    next();
  }
}
