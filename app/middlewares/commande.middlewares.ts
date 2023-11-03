import { NextFunction, Request, Response } from 'express';
import { CommandeAttribut, DataBodyCommande } from '../types/commande.type';
import Validator from '../services/ValidatorService';
import HttpService from '../services/HttpService';
import CommandeService from '../services/CommandeService';
import { Model } from 'sequelize';
import ProduitService from '../services/ProduitService';
import { UserService } from '../services/UserService';
import HistoriqueCommandes from '../models/historiqueCommande';
import { HistoriqueCommandeAttribut } from '../types/historiqueCommande';

const validatorCommande = (req: Request, res: Response, next: NextFunction) => {
  const data: DataBodyCommande = {
    UserId: req.body.UserId,
    ProduitId: req.body.ProduitId,
    quantite: req.body.quantite,
  };

  console.log(data);

  const error = Validator.commandeValidator(data);
  if (error)
    return HttpService.sendResponse(
      res,
      400,
      false,
      error.message,
      error.details,
    );

  next();
};

const validationDate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = new Date(req.body.date);
    next();
  } catch (error) {
    return HttpService.sendResponse(res, 400, false, 'Date invalide.');
  }
};

const checkCommande = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const commandeId: string = req.params.id;
  try {
    const response: Model<CommandeAttribut, CommandeAttribut> | null =
      await CommandeService.getCommande(commandeId);

    if (response === null)
      return HttpService.sendResponse(
        res,
        404,
        false,
        "Cette commande n'existe pas",
      );
    req.body.commandeResult = response.dataValues;
    next();
  } catch (error: any) {
    return HttpService.serverError(
      res,
      HttpService.serverErrorMessage(error.message),
    );
  }
};

const checkProduitInBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const produitId = req.body.ProduitId;
  try {
    const response = await ProduitService.getProduitById(produitId);

    if (response === null)
      return HttpService.sendResponse(
        res,
        404,
        false,
        "Cette produit n'existe pas",
      );
    req.body.produitResult = response.dataValues;
    next();
  } catch (error: any) {
    return HttpService.serverError(
      res,
      HttpService.serverErrorMessage(error.message),
    );
  }
};

const checkUserInBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.UserId;
  try {
    const response = await UserService.getUserById(userId);

    if (response === null)
      return HttpService.sendResponse(
        res,
        404,
        false,
        'Utilisateur introuvable',
      );
    req.body.userResult = response.dataValues;
    next();
  } catch (error: any) {
    return HttpService.serverError(
      res,
      HttpService.serverErrorMessage(error.message),
    );
  }
};

const checkHistoriqueCommade = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const commandeId: string = req.params.id;
  try {
    const response: Model<
      HistoriqueCommandeAttribut,
      HistoriqueCommandeAttribut
    > | null = await HistoriqueCommandes.findOne({
      where: { CommandeId: commandeId },
    });

    if (response === null)
      return HttpService.sendResponse(
        res,
        404,
        false,
        'Historique de la commande introuvable',
      );
    req.body.historiqueCommandeResult = response.dataValues;
    next();
  } catch (error: any) {
    return HttpService.serverError(
      res,
      HttpService.serverErrorMessage(error.message),
    );
  }
};

export default {
  validatorCommande,
  validationDate,
  checkCommande,
  checkProduitInBody,
  checkUserInBody,
  checkHistoriqueCommade,
};
