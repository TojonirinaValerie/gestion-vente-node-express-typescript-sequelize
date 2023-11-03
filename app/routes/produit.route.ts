import express, { Router } from 'express';
import {
  createProduit,
  deleteProduit,
  getProduit,
  getProduits,
  updateProduit,
} from '../controllers/produit.controller';
import utilsMiddlewares from '../middlewares/utils.middlewares';
import produitMiddlewares from '../middlewares/produit.middlewares';
import commandeMiddlewares from '../middlewares/commande.middlewares';

const router: Router = express.Router();

router.get('/', getProduits);
router.get('/:id', getProduit);
router.post(
  '/',
  [
    utilsMiddlewares.verifyField(['designation', 'prixAchat', 'prixVente']),
    produitMiddlewares.validationProduit,
  ],
  createProduit,
);
router.put(
  '/:id',
  [
    produitMiddlewares.checkProduit,
    utilsMiddlewares.verifyField(['designation', 'prixAchat', 'prixVente']),
    produitMiddlewares.validationProduit,
  ],
  updateProduit,
);
router.delete('/:id', [produitMiddlewares.checkProduit], deleteProduit);

export default router;
