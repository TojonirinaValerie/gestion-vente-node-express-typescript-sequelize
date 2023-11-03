import { Request, Response } from 'express';
import { UserAttributes } from '../types/user.type';
import { UserService } from '../services/UserService';
import Users from '../models/user.model';
import { Model } from 'sequelize';
import HttpService from '../services/HttpService';

export const login = (req: Request, res: Response) => {
  return HttpService.serverError(res);
};

export const signup = (req: Request, res: Response) => {
  const userData: UserAttributes = req.body;
  const { value, error } = UserService.signupDataValidator(userData);

  if (error) return HttpService.sendResponse(res, 400, false, error.message);

  Users.create(userData)
    .then((value: Model<UserAttributes>) => {
      return HttpService.sendResponse(
        res,
        200,
        true,
        'Utilisateur créé avec succès.',
        value,
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
