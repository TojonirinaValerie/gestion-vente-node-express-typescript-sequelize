import { Request, Response } from 'express';
import Users from '../models/user.model';
import HttpService from '../services/HttpService';

export const getAllUser = (req: Request, res: Response) => {
  // let listField: string[] = req.body.listField as string[];

  // if (listField.length === 0) listField = req.body.userFields;

  // User.findAll({ attributes: listField })
  //   .then((data) => {
  //     res.status(200).json({
  //       message: 'success',
  //       data,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: err.message,
  //     });
  //   });

  Users.findAll({
    order: [['pseudo', 'ASC']],
  })
    .then((data) => {
      return HttpService.success(res, 'Success', data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

export const getUserData = (req: Request, res: Response) => {
  // const id: string = req.params.id;
  // User.findOne({ where: { id } })
  //   .then((data) => {
  //     if (data)
  //       return res.status(200).json({
  //         message: 'success',
  //         data,
  //       });
  //     else
  //       return res.status(404).json({
  //         message: 'user not found',
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.status(500).json({ message: 'erreur serveur' });
  //   });
};

export const getUsersFieldList = (req: Request, res: Response) => {
  Users.describe()
    .then((data) => {
      return HttpService.sendResponse(
        res,
        200,
        true,
        'Opération réussie',
        data,
      );
    })
    .catch((err) => {
      return HttpService.serverError(
        res,
        `Échec de l'opération ${err.message}`,
      );
    });
};

export const updateUser = (req: Request, res: Response) => {
  return HttpService.serverError(res);
};

export const deleteUser = (req: Request, res: Response) => {
  return HttpService.serverError(res);
};
