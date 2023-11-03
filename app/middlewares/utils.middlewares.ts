import { NextFunction, Request, Response } from 'express';
import HttpService from '../services/HttpService';

const verifyField = (fieldRequired: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!HttpService.isCompletePostData(req, fieldRequired))
      return HttpService.sendResponse(
        res,
        400,
        false,
        HttpService.fieldRequiredMissedMessage(fieldRequired),
      );
    next();
  };
};

export default {
  verifyField,
};
