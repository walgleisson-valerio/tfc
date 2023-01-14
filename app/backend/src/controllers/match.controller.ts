import { Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchService.getMatches(inProgress as string || undefined);

    res.status(200).json(matches);
  }

  static async insertMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const matchInserted = await MatchService.insertMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    } as IMatch);

    res.status(201).json(matchInserted);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const message = await MatchService.finishMatch(Number(id));

    res.status(200).json({ message });
  }
}
