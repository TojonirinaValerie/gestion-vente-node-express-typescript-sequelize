import authRoute from './auth.route';
import userRoute from './user.route';
import dataRoute from './data.route';
import produitRoute from './produit.route';
import commandeRoute from './commande.route';
import historiqueRoute from './historique.route';
import { NextFunction, Request, Response, Router } from 'express';
import HttpService from '../services/HttpService';

const router: Router = Router();

router.get('/api', (req: Request, res: Response, next: NextFunction) => {
  return HttpService.sendResponse(res, 200, true, 'Connexion réussie');
});

router.use('/api/auth', authRoute);
router.use('/api/user', userRoute);
router.use('/api/data', dataRoute);
router.use('/api/produit', produitRoute);
router.use('/api/commande', commandeRoute);
router.use('/api/historique', historiqueRoute);

export default router;
