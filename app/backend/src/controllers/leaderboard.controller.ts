import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService.service';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const homeLeaderboard = await LeaderboardService.getHomeLeaderboard();

    res.status(200).json(homeLeaderboard);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const awayLeaderboard = await LeaderboardService.getAwayLeaderboard();

    res.status(200).json(awayLeaderboard);
  }
}
