import { Router } from 'express';
import LoginValidation from '../middlewares/LoginValidation.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/', LoginValidation.validate, UserController.login);
router.get('/validate', AuthMiddleware.validateToken, UserController.getRole);

export default router;
