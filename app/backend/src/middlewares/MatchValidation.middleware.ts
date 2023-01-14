import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.util';

export default class MatchValidation {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    next();
  }
}
