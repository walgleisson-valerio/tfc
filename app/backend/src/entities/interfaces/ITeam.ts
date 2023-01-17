import IMatch from './IMatch';

export default interface ILogin {
  id: number;
  teamName: string;
  teamHome: IMatch[];
  teamAway: IMatch[];
}
