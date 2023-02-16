import IMatch from './IMatch';

export default interface ITeam {
  id: number;
  teamName: string;
  teamHome: IMatch[];
  teamAway: IMatch[];
}
