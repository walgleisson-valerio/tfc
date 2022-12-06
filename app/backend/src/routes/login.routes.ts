import { Router } from 'express';
import LoginValidation from '../middlewares/LoginValidation.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/login', LoginValidation.validate, UserController.login);

export default router;
