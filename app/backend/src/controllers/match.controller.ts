import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const matches = await MatchService.getAll();

    res.status(200).json(matches);
  }
}
