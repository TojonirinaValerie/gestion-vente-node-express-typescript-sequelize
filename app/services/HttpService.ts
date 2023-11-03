import { Request, Response } from 'express';
import { Filter } from '../types/filter.type';
import { ResponsePagination } from '../types/response.type';

interface ResponseType {
  code: number;
  success: boolean;
  message: string;
  data: any;
}

export default class HttpService {
  // Message d'erreur pour les erreurs serveurs
  static serverErrorMessage(message: string) {
    return `Erreur du serveur: ${message}`;
  }

  // Message d'erreur pour les champs obligatoires
  static fieldRequiredMissedMessage(requiredField: string[]): string {
    return `Veuillez compléter tous les champs obligatoires: ${requiredField}`;
  }

  // Fonction pour verifier les données envoyer dans le body
  static isCompletePostData(req: Request, requiredField: string[]): boolean {
    const body = req.body;
    const bodyKey = Object.keys(body);

    return requiredField.every((field) => {
      return bodyKey.includes(field);
    });
  }

  // Fonction pour verifier les données envoyer en params
  static isCompleteParamsData(req: Request, requiredField: string[]): boolean {
    const params = req.params;
    const paramsKey = Object.keys(params);

    return requiredField.every((field) => {
      return paramsKey.includes(field);
    });
  }
  // Fonction pour uniformiser les reponses
  static sendResponse(
    res: Response,
    code: number,
    success: boolean,
    message: string,
    data?: any,
  ) {
    const response: ResponseType = { success, message, code, data };
    return res.status(code).json(response);
  }
  // Reponse pour les demande reussie
  static success(res: Response, message?: string, data?: any) {
    return this.sendResponse(
      res,
      200,
      true,
      message
        ? message
        : 'Opération réussie',
      data,
    );
  }

  // Reponse pour les erreur servers
  static serverError(res: Response, message?: string, data?: any) {
    return this.sendResponse(
      res,
      500,
      false,
      message
        ? this.serverErrorMessage(message)
        : 'Oups!! Erreur du serveur...',
      data,
    );
  }

  static getFilter(req: Request) {
    const query = req.query;
    let filter: Filter = {
      genre: (query.genre as string) || '',
      value: (query.value as string) || '',
      limit: parseInt(query.limit as string) || 20,
      page: parseInt(query.page as string) || 1,
    };
    return filter;
  }

  static setPaginationResponse<T>(
    filter: Filter,
    count: number,
    rows: T[],
  ): ResponsePagination<T> {
    const totalPage = Math.ceil(count / filter.limit);
    if (filter.page > totalPage) filter.page = totalPage;

    const offset = (filter.page - 1) * filter.limit;
    const data = rows.slice(offset, offset + filter.limit);

    return {
      limit: filter.limit,
      page: filter.page,
      totalRows: count,
      totalPage,
      rows: data,
    };
  }
}
