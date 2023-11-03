import express, { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';
import utilsMiddlewares from '../middlewares/utils.middlewares';
import authMiddlewares from '../middlewares/auth.middlewares';

const router: Router = express.Router();

router.post('/login', login);

router.post(
  '/signup',
  [
    utilsMiddlewares.verifyField([
      'pseudo',
      'password',
    ]),
    authMiddlewares.checkDuplicateEmail,
  ],
  signup,
);

export default router;
