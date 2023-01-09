import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAll();

    res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const team = await TeamService.getTeamById(Number(id));

    res.status(200).json(team);
  }
}
