import { compareSync } from 'bcryptjs';
import ILogin from '../entities/interfaces/ILogin';
import User from '../database/models/UserModel';
import Jwt from '../utils/Jwt.util';
import HttpException from '../utils/HttpException.util';

export default class UserService {
  static async login(login: ILogin) {
    const user = await User.findOne({ where: {
      email: login.email,
    } });

    if (!user || !compareSync(login.password, user.dataValues.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const token = Jwt.createToken(login);

    return token;
  }

  static async getRole(email: string) {
    const user = await User.findOne({ where: {
      email,
    } });
    if (user) return user.role;
  }
}
