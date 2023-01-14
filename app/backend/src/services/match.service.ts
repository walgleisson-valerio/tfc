import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';

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

  static async insertMatch(match: IMatch) {
    const matchInserted = await Match.create({
      ...match, inProgress: true,
    });

    if (matchInserted) return matchInserted;
  }
}
