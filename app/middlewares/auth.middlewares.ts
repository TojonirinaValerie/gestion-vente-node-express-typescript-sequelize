import { NextFunction, Request, Response } from 'express';
import Users from '../models/user.model';
import { Model, where } from 'sequelize';
import { UserAttributes } from '../types/user.type';
import HttpService from '../services/HttpService';

const checkDuplicateEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Users.findOne({
    where: {
      pseudo: req.body.pseudo,
    },
  })
    .then((value: Model<UserAttributes> | null) => {
      if (value)
        return HttpService.sendResponse(
          res,
          409,
          false,
          'Cet email est déjà utilisé',
        );
      next();
    })
    .catch((error) => {
      console.log(error);
      return HttpService.serverError(
        res,
        HttpService.serverErrorMessage(error.message),
      );
    });
};

export default {
  checkDuplicateEmail,
};
