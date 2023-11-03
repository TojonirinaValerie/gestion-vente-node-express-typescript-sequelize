import express, { Router } from 'express';
import {
  createCommande,
  deleteCommande,
  getCommandeByUserId,
  getCommandeByDateByUser,
  getCommandes,
  updateCommande,
} from '../controllers/commande.controller';
import utilsMiddlewares from '../middlewares/utils.middlewares';
import commandeMiddlewares from '../middlewares/commande.middlewares';

const router: Router = express.Router();

router.get('/', getCommandes);
router.get('/:userId', getCommandeByUserId);
router.post(
  '/',
  [
    utilsMiddlewares.verifyField(['UserId', 'ProduitId', 'quantite']),
    commandeMiddlewares.validatorCommande,
  ],
  createCommande,
);

router.put(
  '/:id',
  [
    commandeMiddlewares.checkCommande,
    utilsMiddlewares.verifyField(['UserId', 'ProduitId', 'quantite']),
    commandeMiddlewares.validatorCommande,
    commandeMiddlewares.checkUserInBody,
    commandeMiddlewares.checkProduitInBody,
  ],
  updateCommande,
);

router.delete(
  '/:id',
  [
    commandeMiddlewares.checkCommande,
    commandeMiddlewares.checkHistoriqueCommade,
  ],
  deleteCommande,
);

router.post(
  '/:userId',
  [utilsMiddlewares.verifyField(['date'])],
  getCommandeByDateByUser,
);

export default router;
