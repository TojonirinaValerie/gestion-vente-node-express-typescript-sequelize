import { Request, Response } from 'express';
import HttpService from '../services/HttpService';

export const getHistorique = (req: Request, res: Response) => {
  return HttpService.sendResponse(res, 200, true, 'success');
};
