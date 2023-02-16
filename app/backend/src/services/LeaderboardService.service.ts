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
      const teamStatus = new TeamStatus(team.id, team.teamName, team.teamHome);
      ranking = [...ranking, { ...teamStatus }];
    });

    const orderedRanking = LeaderboardUtils.sortRanking(ranking);
    return orderedRanking;
  }

  static async getAwayLeaderboard() {
    const teamsInfo = await this.getTeamsInfo();
    let ranking: ITeamStatus[] = [];
    teamsInfo.forEach((team: ITeam) => {
      const teamStatus = new TeamStatus(team.id, team.teamName, team.teamAway);
      ranking = [...ranking, { ...teamStatus }];
    });
    const orderedRanking = LeaderboardUtils.sortRanking(ranking);

    return orderedRanking;
  }

  static setRanking(teams: ITeam[]) {
    let ranking: ITeamStatus[] = [];
    teams.forEach((team: ITeam) => {
      const teamStatus = new TeamStatus(
        team.id,
        team.teamName,
        [...team.teamHome, ...team.teamAway],
      );
      ranking = [...ranking, { ...teamStatus }];
    });
    const orderedRanking = LeaderboardUtils.sortRanking(ranking);

    return orderedRanking;
  }

  static async getLeaderboard() {
    const teamsInfo = await this.getTeamsInfo();

    const ranking = this.setRanking(teamsInfo);
    // let ranking: ITeamStatus[] = [];
    // teamsInfo.forEach((team: ITeam) => {
    //   const teamStatus = new TeamStatus(
    //     team.id,
    //     team.teamName,
    //     [...team.teamHome, ...team.teamAway],
    //   );
    //   ranking = [...ranking, { ...teamStatus }];
    // });
    // const orderedRanking = LeaderboardUtils.sortRanking(ranking);

    return ranking;
  }
}
