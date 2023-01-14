import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchService.getMatches(inProgress as string || undefined);

    res.status(200).json(matches);
  }
}
