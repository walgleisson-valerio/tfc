import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import LeaderboardUtils from '../utils/Leaderboard.utils';
import ITeam from '../entities/interfaces/ITeam';
import TeamStatus from '../entities/TeamStatus';
import ITeamStatus from '../entities/interfaces/ITeamStatus';

export default class LeaderboardService {
  static async getTeamsInfo() {
    const team = await Team.findAll({
      include: [{ model: Match, as: 'teamHome' }, { model: Match, as: 'teamAway' }],
    });
    const str = JSON.stringify(team);
    const obj = JSON.parse(str);

    return obj;
  }

  static async getHomeLeaderboard() {
    const teamsInfo = await this.getTeamsInfo();
    let ranking: ITeamStatus[] = [];
    teamsInfo.forEach((team: ITeam) => {
      const teamStatus = new TeamStatus(team.teamName, team.teamHome);
      ranking = [...ranking, { ...teamStatus }];
    });

    const orderedRanking = LeaderboardUtils.sortRanking(ranking);
    // console.log(orderedRanking);
    return orderedRanking;
  }

  // static async getHomeLeaderboard() {
  //   this.getHomeRanking();

  //   const matches = await Team.findAll({
  //     // where: { teamName: 'Santos' },
  //     include: [{ model: Match, as: 'teamHome' }, { model: Match, as: 'teamAway' }],
  //   });

  //   return matches;
  // }
}
