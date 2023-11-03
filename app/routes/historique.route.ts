import express, { Router } from 'express';
import { getHistorique } from '../controllers/historique.controller';

const router: Router = express.Router();

router.get('/historique', getHistorique);

export default router;
