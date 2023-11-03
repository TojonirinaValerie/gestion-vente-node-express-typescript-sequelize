import { Request, Response } from 'express';
import HttpService from '../services/HttpService';
import { CommandeAttribut, CommandeFiltre } from '../types/commande.type';
import Users from '../models/user.model';
import { UserAttributes } from '../types/user.type';
import { Model, Op, Transaction } from 'sequelize';
import Produits from '../models/produit.model';
import { ProduitAttribut } from '../types/produit.type';
import Commandes from '../models/commande.model';
import { v4 as uuidv4 } from 'uuid';
import CommandeService from '../services/CommandeService';
import sequelize from '../db.config';
import HistoriqueCommandes from '../models/historiqueCommande';
import { HistoriqueCommandeAttribut } from '../types/historiqueCommande';

export const createCommande = async (req: Request, res: Response) => {
  const commande: CommandeAttribut = {
    ...req.body,
    id: uuidv4(),
    date: new Date(),
  };

  const transaction = await sequelize.transaction();

  try {
    const client: Model<UserAttributes, UserAttributes> | null =
      await Users.findOne({ where: { id: commande.UserId } });

    if (client === null) {
      return HttpService.sendResponse(
        res,
        404,
        true,
        "Échec de l'opération: CLient introuvable",
      );
    }

    const produit: Model<ProduitAttribut, ProduitAttribut> | null =
      await Produits.findOne({
        where: { id: commande.ProduitId },
      });

    if (produit === null) {
      return HttpService.sendResponse(
        res,
        404,
        true,
        "Échec de l'opération: Produit introuvable",
      );
    }

    const result: Model<CommandeAttribut, CommandeAttribut> =
      await Commandes.create(commande, { transaction });

    const historiqueCommande: HistoriqueCommandeAttribut = {
      id: uuidv4(),
      date: commande.date,
      UserId: client.dataValues.id,
      ProduitId: produit.dataValues.id,
      CommandeId: result.dataValues.id,
      produitDesignation: produit.dataValues.designation,
      produitPrixVente: produit.dataValues.prixVente,
      produitPrixAchat: produit.dataValues.prixAchat,
      quantite: commande.quantite,
    };

    const resultHistorique: Model<
      HistoriqueCommandeAttribut,
      HistoriqueCommandeAttribut
    > = await HistoriqueCommandes.create(historiqueCommande, { transaction });

    await transaction.commit();

    return HttpService.success(res, 'Données sauvegardées avec succès', result);
  } catch (error: any) {
    console.log(error);
    await transaction.rollback();
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error,
    );
  }
};

export const getCommandes = (req: Request, res: Response) => {
  return HttpService.serverError(res);
};

export const getCommandeByUserId = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const result = await CommandeService.getListCommande();
    return HttpService.success(res, 'Demande réussie', result);
  } catch (error: any) {
    console.log(error);
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error,
    );
  }
};

export const updateCommande = async (req: Request, res: Response) => {
  const updateCommande: CommandeAttribut = req.body.commandeResult;
  const produit: ProduitAttribut = req.body.produitResult;
  const user: UserAttributes = req.body.userResult;

  const data = {
    ProduitId: produit.id,
    UserId: user.id,
    quantite: req.body.quantite,
    date: updateCommande.date,
  };
  const historiqueCommandedata = {
    id: uuidv4(),
    date: updateCommande.date,
    UserId: user.id,
    produitDesignation: produit.designation,
    produitPrixVente: produit.prixVente,
    produitPrixAchat: produit.prixAchat,
    quantite: req.body.quantite,
  };

  const transaction = await sequelize.transaction();

  try {
    const result = await Commandes.update(
      { ...data },
      { where: { id: updateCommande.id }, transaction },
    );

    const resultH = await HistoriqueCommandes.update(
      { ...historiqueCommandedata },
      { where: { CommandeId: updateCommande.id }, transaction },
    );

    await transaction.commit();

    return HttpService.sendResponse(
      res,
      203,
      true,
      'Mise à jour avec success',
      { commandeUpdate: result, historiqueCommandeUpdate: resultH },
    );
  } catch (error: any) {
    console.log(error);

    await transaction.rollback();
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error,
    );
  }
};

export const deleteCommande = async (req: Request, res: Response) => {
  const updateCommande: CommandeAttribut = req.body.commandeResult;
  const historiqueCommande: HistoriqueCommandeAttribut =
    req.body.historiqueCommandeResult;
  console.log(historiqueCommande);

  const transaction = await sequelize.transaction();

  try {
    const response = await Commandes.destroy({
      where: { id: updateCommande.id },
      transaction,
    });

    const responseH = await HistoriqueCommandes.destroy({
      where: { id: historiqueCommande.id },
      transaction,
    });
    console.log(response, responseH);

    await transaction.commit();

    console.log(response, responseH);

    if (response > 0 && responseH > 0) {
      return HttpService.success(res, 'Commande supprimée avec success');
    } else {
      return HttpService.success(res, 'Aucune commande supprimée');
    }
  } catch (error: any) {
    console.log(error);
    await transaction.rollback();
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error,
    );
  }
};

export const getCommandeByDateByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  const date: Date = new Date(req.body.date);

  try {
    const result = await Commandes.findAll({
      where: {
        UserId: userId,
        date: {
          [Op.gt]: date.setHours(0, 0, 0, 0),
          [Op.lt]: date.setHours(24, 0, 0, 0),
        },
      },
      order: [['date', 'DESC']],
      include: [{ model: Produits }, { model: Users }],
    });
    return HttpService.success(res, 'Demande réussie', result);
  } catch (error: any) {
    console.log(error);
    return HttpService.serverError(
      res,
      `Demande non réussie: ${error.message}`,
      error,
    );
  }
};
