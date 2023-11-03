import { NextFunction, Request, Response } from 'express';
import { DataBodyProduit } from '../types/produit.type';
import Validator from '../services/ValidatorService';
import HttpService from '../services/HttpService';
import ProduitService from '../services/ProduitService';

const validationProduit = (req: Request, res: Response, next: NextFunction) => {
  const data: DataBodyProduit = {
    designation: req.body.designation,
    prixAchat: req.body.prixAchat,
    prixVente: req.body.prixVente,
  };

  const error = Validator.produitValidator(data);
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

const checkProduit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: string = req.params.id;
  try {
    const response = await ProduitService.getProduitById(id);

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

export default { validationProduit, checkProduit };
