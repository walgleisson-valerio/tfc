import { Router } from 'express';
import MatchValidation from '../middlewares/MatchValidation.middleware';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.getMatches);
router.post('/', MatchValidation.validate, MatchController.insertMatch);
router.patch('/:id/finish', MatchController.finishMatch);

export default router;
