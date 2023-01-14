import { Router } from 'express';
import MatchValidation from '../middlewares/MatchValidation.middleware';
import MatchController from '../controllers/match.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', MatchController.getMatches);
router.post(
  '/',
  AuthMiddleware.validateToken,
  MatchValidation.validate,
  MatchController.insertMatch,
);
router.patch('/:id/finish', MatchController.finishMatch);

export default router;
