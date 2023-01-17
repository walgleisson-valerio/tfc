import IMatch from './interfaces/IMatch';

export default class TeamStatus {
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws:number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency:string;

  constructor(name: string, teamHome: IMatch[]) {
    this.name = name;
    this.totalGames = 0;
    this.totalPoints = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = '0.00';

    this.updateHomeResults(teamHome);
    this.setTotalPoints();
    this.setGoalsBalance();
    this.setEfficiency();
  }

  setTotalPoints() {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  setGoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  setEfficiency() {
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  updateHomeResults(matches: IMatch[]): void {
    matches.forEach(async (match: IMatch) => {
      const { homeTeamGoals, awayTeamGoals, inProgress } = match;
      if (!inProgress) {
        this.updateStatus(homeTeamGoals, awayTeamGoals);
      }
    });
  }

  updateStatus(homeTeamGoals: number, awayTeamGoals: number) {
    this.totalGames += 1;
    if (homeTeamGoals > awayTeamGoals) {
      this.totalVictories += 1;
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    } if (homeTeamGoals < awayTeamGoals) {
      this.totalLosses += 1;
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    } if (homeTeamGoals === awayTeamGoals) {
      this.totalDraws += 1;
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    }
  }
}
