import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Produits from '../models/produit.model';
import HttpService from '../services/HttpService';
import { ProduitAttribut } from '../types/produit.type';
import { Order } from 'sequelize';
import sequelize from '../db.config';
import HistoriqueCommandes from '../models/historiqueCommande';

export const createProduit = (req: Request, res: Response) => {
  const produit: ProduitAttribut = {
    ...req.body,
    id: uuidv4(),
    quantiteReste: 0,
  };

  Produits.create(produit)
    .then((data: Model<ProduitAttribut, ProduitAttribut>) => {
      return HttpService.success(res, 'Produit enregistré avec succès', data);
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(res, `${error.message}`, error.errors);
    });
};

export const getProduits = (req: Request, res: Response) => {
  Produits.findAll({
    order: [['designation', 'ASC']],
  })
    .then((data: Model<ProduitAttribut, ProduitAttribut>[]) => {
      return HttpService.success(res, 'Opération réussie', data);
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(
        res,
        `Demande non réussie: ${error.message}`,
      );
    });
};

export const getProduit = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Produits.findOne({
    where: {
      id,
    },
  })
    .then((data: Model<ProduitAttribut, ProduitAttribut> | null) => {
      if (data === null) {
        return HttpService.sendResponse(res, 404, true, 'Produit introuvable');
      }
      return HttpService.success(res, 'Opération réussie', data);
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(
        res,
        `Demande non réussie: ${error.message}`,
      );
    });
};

export const updateProduit = async (req: Request, res: Response) => {
  const produitToUpdate: ProduitAttribut = req.body.produitResult;

  const transaction = await sequelize.transaction();

  try {
    const produit: ProduitAttribut = {
      ...req.body,
    };

    const result: number[] = await Produits.update(produit, {
      where: { id: produitToUpdate.id },
      transaction,
    });

    const responseH: number[] = await HistoriqueCommandes.update(
      {
        produitDesignation: produit.designation,
        produitPrixAchat: produit.prixAchat,
        produitPrixVente: produit.prixVente,
      },
      {
        where: {
          ProduitId: produitToUpdate.id,
          date: {
            [Op.gt]: new Date().setHours(0, 0, 0, 0),
            [Op.lt]: new Date().setHours(24, 0, 0, 0),
          },
        },
        transaction,
      },
    );

    await transaction.commit();

    const produitUpdate: ProduitAttribut = {
      ...produitToUpdate,
      designation: req.body.designation,
      prixAchat: req.body.prixAchat,
      prixVente: req.body.prixVente,
    };

    return HttpService.success(res, 'Mise à jour réussie !', produitUpdate);
  } catch (error: any) {
    console.log(error);
    await transaction.rollback();
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error.errors,
    );
  }
};

export const deleteProduit = async (req: Request, res: Response) => {
  const produit: ProduitAttribut = req.body.produitResult;

  try {
    const response = await Produits.destroy({ where: { id: produit.id } });
    if (response > 0) {
      return HttpService.success(res, 'Produit supprimée avec success');
    } else {
      return HttpService.success(res, 'Aucune produit supprimée');
    }
  } catch (error: any) {
    console.log(error);
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error.errors,
    );
  }
};
