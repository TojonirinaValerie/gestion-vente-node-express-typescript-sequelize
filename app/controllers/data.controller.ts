import { Request, Response } from 'express';
import HttpService from '../services/HttpService';
import path from 'path';
import rootDir from '../rootDir';
import fs from 'fs';
import { OldClient, UserAttributes } from '../types/user.type';
import OldDataService, { TABLES } from '../services/OldDataService';
import { OldProduit, ProduitAttribut } from '../types/produit.type';
import Produits from '../models/produit.model';
import { Model } from 'sequelize';
import { error } from 'console';
import Users from '../models/user.model';

export const readDataJSON = (req: Request, res: Response) => {
  const dataTables = OldDataService.getDataTables<OldClient>(TABLES.clients);
  if (dataTables != null) {
    console.log(dataTables);
  }
  return HttpService.serverError(res);
};

export const addDataProduit = (req: Request, res: Response) => {
  const dataProduits: OldProduit[] | null =
    OldDataService.getDataTables<OldProduit>(7);
  if (dataProduits === null) {
    return HttpService.serverError(res);
  }

  const dataNewProduit =
    OldDataService.dataOldProduitToDataProduitAttribut(dataProduits);

  Produits.bulkCreate(dataNewProduit)
    .then((data: Model<ProduitAttribut, ProduitAttribut>[]) => {
      return HttpService.sendResponse(
        res,
        200,
        true,
        'Traitement effectué avec succès',
        data,
      );
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(
        res,
        `enregistrment échoué: ${error.message}`,
      );
    });
};

export const addDataUser = (req: Request, res: Response) => {
  const dataClients: OldClient[] | null =
    OldDataService.getDataTables<OldClient>(4);
  if (dataClients === null) {
    return HttpService.serverError(res);
  }

  const dataNewUser =
    OldDataService.dataOldClientToDataUserAttribut(dataClients);

  Users.bulkCreate(dataNewUser)
    .then((data: Model<UserAttributes, UserAttributes>[]) => {
      return HttpService.sendResponse(
        res,
        200,
        true,
        'Traitement effectué avec succès',
        data,
      );
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(
        res,
        `enregistrment échoué: ${error.message}`,
        error,
      );
    });
};
