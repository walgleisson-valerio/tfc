import ITeamStatus from '../entities/interfaces/ITeamStatus';

export default class LeaderboardUtils {
  static sortRanking(ranking: ITeamStatus[]) {
    return ranking.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
  }
}
