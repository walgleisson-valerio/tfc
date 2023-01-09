import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class MatchService {
  static async getAll() {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    });
    return matches;
  }
}
