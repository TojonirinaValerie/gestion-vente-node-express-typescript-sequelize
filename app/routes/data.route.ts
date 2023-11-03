import express, { Router } from "express";
import { addDataProduit, addDataUser, readDataJSON } from "../controllers/data.controller";

const router: Router = express.Router();

router.get('/', readDataJSON);
router.get('/add-data-produits', addDataProduit);
router.get('/add-data-users', addDataUser);

export default router;