import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatch from '../entities/interfaces/IMatch';
import HttpException from '../utils/HttpException.util';
import TeamService from './team.service';

export default class MatchService {
  static async getMatches(inProgress: string | undefined) {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    });

    if (inProgress === 'true' || inProgress === 'false') {
      return matches.filter((match) => match.inProgress.toString() === inProgress);
    }

    return matches;
  }

  static async validateTeams(homeTeamID: number, awayTeamID: number) {
    const homeTeam = await TeamService.getTeamById(homeTeamID);
    const awayTeam = await TeamService.getTeamById(awayTeamID);
    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  static async insertMatch(match: IMatch) {
    await this.validateTeams(match.homeTeam, match.awayTeam);

    const matchInserted = await Match.create({
      ...match, inProgress: true,
    });

    if (matchInserted) return matchInserted;
  }

  static async finishMatch(id: number) {
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );

    return 'Finished';
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });

    return 'Update Successful';
  }
}
