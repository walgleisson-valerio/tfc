import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }

  static async getTeamById(id: number) {
    const teams = await Team.findByPk(id);
    return teams;
  }
}
