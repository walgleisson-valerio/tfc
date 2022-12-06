import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ILogin from '../interfaces/ILogin';

dotenv.config();

export default class Jwt {
  static createToken(data: ILogin) {
    const token = sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  }

  static validateToken(token: string) {
    try {
      const data = verify(token, process.env.JWT_SECRET as string);

      return data;
    } catch (e) {
      const err = new Error('Expired or invalid token');

      throw err;
    }
  }
}
