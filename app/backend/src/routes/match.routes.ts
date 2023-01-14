import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.getMatches);
router.post('/', MatchController.insertMatch);
router.patch('/:id/finish', MatchController.finishMatch);

export default router;
