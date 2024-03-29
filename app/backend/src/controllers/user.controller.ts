import { Request, Response } from 'express';
import userService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const token = await userService.login(req.body);

    res.status(200).json({ token });
  }

  static async getRole(req: Request, res: Response) {
    const { email } = req.body.user;

    const role = await userService.getRole(email);

    res.status(200).json({ role });
  }
}
