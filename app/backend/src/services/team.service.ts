import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }
}
